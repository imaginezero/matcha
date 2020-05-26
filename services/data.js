const { join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const slugify = require('slugify');
const camelcaseKeys = require('camelcase-keys');
const cloneDeep = require('clone-deep');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const fileName = join(process.cwd(), 'data', 'activities.json');

exports.fetchRawData = async () => {
  const doc = new GoogleSpreadsheet(
    '1Zym-l_NoWmi-u45UVUJjzLrU-36AKBjteTTaEC9UWk8'
  );
  await doc.useServiceAccountAuth({
    client_email: process.env.GSUITE_EMAIL,
    private_key: process.env.GSUITE_TOKEN,
  });
  await doc.loadInfo();
  return Promise.all(
    doc.sheetsByIndex.map((sheet) =>
      sheet
        .getRows({
          offset: 0,
          limit: sheet.rowCount,
        })
        .then((rows) => ({
          [sheet.title]: rows.map((row) => {
            row.slug = slugify(row.name.toLowerCase());
            return row;
          }),
        }))
    )
  ).then((partials) =>
    partials.reduce((result, partial) => ({ ...result, ...partial }), {})
  );
};

exports.fetchJsonData = async () => {
  const rawData = await exports.fetchRawData();
  return camelcaseKeys(
    Object.fromEntries(
      Object.entries(rawData).map(([key, rows]) => [
        key,
        rows
          .map((row) =>
            Object.keys(row)
              .filter((key) => !key.startsWith('_'))
              .reduce(
                (obj, key) => ({
                  ...obj,
                  [key]:
                    row[key] === 'TRUE'
                      ? true
                      : row[key] === 'FALSE'
                      ? false
                      : row[key],
                }),
                {}
              )
          )
          .filter((row) => Object.values(row).some((value) => value)),
      ])
    ),
    { deep: true }
  );
};

exports.saveData = async () =>
  writeFile(fileName, JSON.stringify(await exports.fetchJsonData()));

exports.getData = async () =>
  cloneDeep(
    exports.cache || (exports.cache = JSON.parse(await readFile(fileName)))
  );
