const { GoogleSpreadsheet } = require('google-spreadsheet');
const slugify = require('slugify');
const camelcaseKeys = require('camelcase-keys');

const data = require('../data/activities.json');

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
      sheet.getRows().then((rows) => ({ [sheet.title]: rows }))
    )
  ).then((partials) =>
    partials.reduce((result, partial) => ({ ...result, ...partial }), {})
  );
};

exports.fetchData = async () => {
  const rawData = await fetchRawData();
  const data = Object.fromEntries(
    Object.entries(rawData).map(([key, rawRows]) => {
      const rows = rawRows
        .map((row) =>
          Object.keys(row)
            .filter((key) => !key.startsWith('_'))
            .reduce((obj, key) => ({ ...obj, [key]: normalize(row[key]) }), {
              slug: row.name ? slugify(row.name.toLowerCase()) : null,
            })
        )
        .filter((row) => Object.values(row).some((value) => value));
      return [key, rows];
    })
  );
  return camelcaseKeys(data, { deep: true });
};

exports.getData = async (preview) => (preview ? exports.fetchData() : data);

exports.dataFile = require.resolve('../data/activities.json');
