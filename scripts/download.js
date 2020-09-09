const { basename, join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

require('dotenv').config({ path: join(process.cwd(), '.env.local') });

const pkgDir = require('pkg-dir');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const axios = require('axios');

const { fetchEntries } = require('../utils/content');

const projectFolder = pkgDir.sync();
const cacheFolder = join(projectFolder, 'data');
const imageFolder = join(projectFolder, 'public', 'images');

const fileExists = fs.existsSync;
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const rmdir = promisify(rimraf);

const types = ['activity', 'category', 'organization', 'page', 'resource'];

async function fetchImage(url, slug) {
  const fileName = `${slug}.jpg`;
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  await writeFile(join(imageFolder, fileName), data);
  return `/${basename(imageFolder)}/${fileName}`;
}

async function processEntry(entry) {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(entry).map(async ([key, value]) => {
        if (value.type === 'image') {
          const url = await fetchImage(value.url, entry.slug);
          return [key, { ...value, url }];
        }
        return [key, value];
      })
    )
  );
}

const cache = {};
exports.getCachedEntries = async function getCachedEntries(type) {
  if (!(type in cache)) {
    const cacheFile = join(cacheFolder, `${type}.json`);
    if (fileExists(cacheFile)) {
      cache[type] = JSON.parse(await readFile(cacheFile, 'utf8'));
    } else {
      cache[type] = null;
    }
  }
  return cache[type];
};

if (require.main === module) {
  (async () => {
    try {
      await Promise.all(
        [cacheFolder, imageFolder].map(async (folder) => {
          await rmdir(folder);
          await mkdirp(folder);
        })
      );
      await Promise.all(
        types.map(async (type) => {
          const entries = await Promise.all(
            (await fetchEntries(type, true)).map(processEntry)
          );
          await writeFile(
            join(cacheFolder, `${type}.json`),
            JSON.stringify(entries, null, 2)
          );
        })
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}
