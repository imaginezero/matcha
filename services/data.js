const { join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const slugify = require('slugify');
const camelcaseKeys = require('camelcase-keys');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const fileName = join(process.cwd(), 'data', 'activities.json');

const normalize = (value) => {
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;
  if (value === undefined || value === '') return null;
  if (/^[\d.]+$/.test(value)) return Number(value);
  return value;
};

const getDoc = (() => {
  let doc;
  return async () => {
    if (doc === undefined) {
      doc = new GoogleSpreadsheet(
        '1Zym-l_NoWmi-u45UVUJjzLrU-36AKBjteTTaEC9UWk8'
      );
      await doc.useServiceAccountAuth({
        client_email: process.env.GSUITE_EMAIL,
        private_key: process.env.GSUITE_TOKEN,
      });
      await doc.loadInfo();
    }
    return doc;
  };
})();

const fetchRawData = async () => {
  const doc = await getDoc();
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

const fetchData = async () => {
  const rawData = await fetchRawData();
  return camelcaseKeys(
    Object.fromEntries(
      Object.entries(rawData).map(([key, rows]) => [
        key,
        rows
          .map((row) =>
            Object.keys(row)
              .filter((key) => !key.startsWith('_'))
              .reduce(
                (obj, key) => ({ ...obj, [key]: normalize(row[key]) }),
                {}
              )
          )
          .filter((row) => Object.values(row).some((value) => value)),
      ])
    ),
    { deep: true }
  );
};

exports.getData = (() => {
  let data;
  return async (preview) => {
    if (preview) return fetchData();
    if (data === undefined) {
      data = await readFile(fileName);
    }
    return JSON.parse(data);
  };
})();

exports.saveData = async () => {
  return writeFile(fileName, JSON.stringify(await fetchData()));
};
