require('dotenv').config();

const { promisify } = require('util');
const { basename, dirname, join } = require('path');
const fs = require('fs');

const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const axios = require('axios');
const pLimit = require('p-limit');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

const { getData, dataFile } = require('../utils/data');

const imageFolder = join(dirname(__dirname), 'public', 'images');

const limit = pLimit(2);
const writeFile = promisify(fs.writeFile);
const deleteFiles = promisify(rimraf);

(async () => {
  try {
    const data = await getData(true);
    await deleteFiles(dataFile);
    await deleteFiles(imageFolder);
    await mkdirp(imageFolder);
    const activities = await Promise.all(
      data.activities.map((activity) =>
        limit(async () => {
          const { slug, imgUrlInternal } = activity;
          const fileName = `${slug}.jpg`;
          const { data } = await axios.get(imgUrlInternal, {
            responseType: 'arraybuffer',
          });
          await writeFile(
            join(imageFolder, fileName),
            await imagemin.buffer(
              await sharp(data)
                .resize({ width: 900, height: 600 })
                .jpeg({ quality: 80 })
                .toBuffer(),
              {
                plugins: [imageminJpegtran({ progressive: true })],
              }
            )
          );
          return {
            ...activity,
            imgUrlPublic: `/${basename(imageFolder)}/${fileName}`,
          };
        })
      )
    );
    await writeFile(dataFile, JSON.stringify({ ...data, activities }));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
