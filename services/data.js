const axios = require('axios');
const parse = require('neat-csv');
const slugify = require('slugify');
const camelcaseKeys = require('camelcase-keys');

const data = require('../data/activities.json');

const urls = {
  activities: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSSeVFjS2xuAjwBULrHXhp1stM2Cz_uFfdeV_Qgjx5aahw1bze3AhgD5Ds3LA5FC-EkXjiMJ2-peeAM/pub?gid=561168914&single=true&output=csv`,
  organizations: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSSeVFjS2xuAjwBULrHXhp1stM2Cz_uFfdeV_Qgjx5aahw1bze3AhgD5Ds3LA5FC-EkXjiMJ2-peeAM/pub?gid=808798055&single=true&output=csv`,
  activityTypes: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSSeVFjS2xuAjwBULrHXhp1stM2Cz_uFfdeV_Qgjx5aahw1bze3AhgD5Ds3LA5FC-EkXjiMJ2-peeAM/pub?gid=514925567&single=true&output=csv`,
};

const normalize = (value) => {
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;
  if (value === undefined || value === '') return null;
  if (/^[\d.]+$/.test(value)) return Number(value);
  return value;
};

exports.fetchData = async () =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(urls).map(async ([key, url]) => {
        const { data: csv } = await axios.get(url);
        const rawRows = await parse(csv);
        const rows = rawRows
          .filter(
            (row) => row.name && Object.values(row).some((value) => value)
          )
          .map((row) =>
            Object.entries(row).reduce(
              (obj, [key, value]) => ({ ...obj, [key]: normalize(value) }),
              { slug: slugify(row.name.toLowerCase()) }
            )
          );
        return [key, camelcaseKeys(rows, { deep: true })];
      })
    )
  );

exports.getData = async (preview) => (preview ? exports.fetchData() : data);

exports.dataFile = require.resolve('../data/activities.json');
