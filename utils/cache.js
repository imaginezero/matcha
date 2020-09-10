const { join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const pkgDir = require('pkg-dir');

const fileExists = fs.existsSync;
const readFile = promisify(fs.readFile);

const cacheFolder = join(pkgDir.sync(), 'data');

function getCacheFileName(type) {
  return join(cacheFolder, `${type}.json`);
}

const cache = {};

exports.getCachedEntries = async function getCachedEntries(type) {
  if (!(type in cache)) {
    const cacheFile = getCacheFileName(type);
    if (fileExists(cacheFile)) {
      cache[type] = JSON.parse(await readFile(cacheFile, 'utf8'));
    } else {
      cache[type] = null;
    }
  }
  return cache[type];
};

exports.getCacheFileName = getCacheFileName;
exports.cacheFolder = cacheFolder;
