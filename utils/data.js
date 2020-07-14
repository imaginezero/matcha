const axios = require('axios');
const parse = require('neat-csv');
const slugify = require('slugify');
const camelcaseKeys = require('camelcase-keys');

const data = require('../data/activities.json');

const urls = {
  activities: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTUngdAx7n9WUQddwK-82FpSMHtEUrsQX_LOI150YIhNA-VLEEaAlFdNXPNpcAFLU3Jt9pw-IXyX2Rp/pub?gid=561168914&single=true&output=csv`,
  organizations: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTUngdAx7n9WUQddwK-82FpSMHtEUrsQX_LOI150YIhNA-VLEEaAlFdNXPNpcAFLU3Jt9pw-IXyX2Rp/pub?gid=808798055&single=true&output=csv`,
  activityTypes: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTUngdAx7n9WUQddwK-82FpSMHtEUrsQX_LOI150YIhNA-VLEEaAlFdNXPNpcAFLU3Jt9pw-IXyX2Rp/pub?gid=514925567&single=true&output=csv`,
};

function normalize(value) {
  if (value === 'TRUE') return true;
  if (value === 'FALSE') return false;
  if (value === undefined || value === '') return null;
  if (/^[\d.]+$/.test(value)) return Number(value);
  return value;
}

function getDefaults(row) {
  const { imgUrlInternal: imgUrlPublic, impactScore, effortScore } = row;
  return {
    slug: slugify(row.name.toLowerCase()),
    ...(imgUrlPublic ? { imgUrlPublic } : {}),
    ...(impactScore && effortScore
      ? {
          aggregateScore: Math.round(
            (Math.pow(impactScore, 2) / effortScore) * Math.log2(impactScore)
          ),
        }
      : {}),
  };
}

exports.getData = async (preview) =>
  preview
    ? Object.fromEntries(
        await Promise.all(
          Object.entries(urls).map(async ([key, url]) => {
            const { data: csv } = await axios.get(url);
            const rawRows = await parse(csv);
            const rows = rawRows
              .filter(
                (row) => row.name && Object.values(row).some((value) => value)
              )
              .map(camelcaseKeys)
              .map((row) =>
                Object.entries(row).reduce(
                  (obj, [key, value]) => ({ ...obj, [key]: normalize(value) }),
                  getDefaults(row)
                )
              );
            return [key, rows];
          })
        )
      )
    : data;

exports.dataFile = require.resolve('../data/activities.json');
