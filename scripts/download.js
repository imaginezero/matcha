#!/usr/bin/env node

const { basename, join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const pkgDir = require('pkg-dir');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const axios = require('axios');

const { fetchEntries } = require('../utils/content');
const { cacheFolder, getCacheFileName } = require('../utils/cache');

const rootFolder = pkgDir.sync();
const imageFolder = join(rootFolder, 'public', 'images');

const mkfile = promisify(fs.writeFile);
const rmdir = promisify(rimraf);

const types = ['activity', 'category', 'organization', 'page', 'resource'];

async function fetchImage(url, slug) {
  const fileName = `${slug}.jpg`;
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  await mkfile(join(imageFolder, fileName), data);
  return `/${basename(imageFolder)}/${fileName}`;
}

async function fetchImages(entry) {
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

if (require.main === module) {
  require('dotenv').config({
    path: join(rootFolder, '.env.local'),
  });
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
            (await fetchEntries(type)).map(fetchImages)
          );
          await mkfile(getCacheFileName(type), JSON.stringify(entries));
        })
      );
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}
