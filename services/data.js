require('dotenv').config();

const { dirname, join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { parse, stringify } = require('flatted/cjs');
const camelcaseKeys = require('camelcase-keys');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const fileName = join(dirname(__dirname), 'data', 'activities.dat');

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
        .then((rows) => ({ [sheet.title]: rows }))
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

exports.fetchAndHydrateData = async () => {
  const {
    activities,
    activityTypes,
    organizations,
  } = await exports.fetchJsonData();
  activities.forEach((activity) => {
    activity.organization = organizations.find(
      ({ name }) => name === activity.organization
    );
    activity.type = activityTypes.find(({ type }) => type === activity.type);
  });
  activityTypes.forEach((type) => {
    type.activities = activities.filter((activity) => activity.type === type);
  });
  organizations.forEach((organization) => {
    organization.activities = activities.filter(
      (activity) => activity.organization === organization
    );
  });
  return { activities, activityTypes, organizations };
};

exports.saveData = async () =>
  writeFile(fileName, stringify(await exports.fetchAndHydrateData()));

exports.getData = async () =>
  exports.cache || (exports.cache = parse(await readFile(fileName)));
