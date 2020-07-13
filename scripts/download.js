require('dotenv').config();

const { promisify } = require('util');
const { basename, dirname, join } = require('path');
const fs = require('fs');

const rimraf = require('rimraf');
const axios = require('axios');
const pLimit = require('p-limit');
const sharp = require('sharp');

const limit = pLimit(2);

const { getData, dataFile } = require('../utils/data');

const imageFolder = join(dirname(__dirname), 'public', 'activities');

const writeFile = promisify(fs.writeFile);
const deleteFiles = promisify(rimraf);

(async () => {
  try {
    const start = Date.now();
    const data = await getData(true);
    await deleteFiles(dataFile);
    await deleteFiles(join(imageFolder, '*'));
    const activities = await Promise.all(
      data.activities.map((activity) =>
        limit(async () => {
          const { slug, imgUrlInternal } = activity;
          const fileName = `${slug}.jpg`;
          const { data } = await axios.get(imgUrlInternal, {
            responseType: 'arraybuffer',
          });
          await sharp(Buffer.from(data))
            .resize({ width: 1200, height: 800 })
            .jpeg({ quality: 75 })
            .toFile(join(imageFolder, fileName));
          return {
            ...activity,
            imgUrlPublic: `/${basename(imageFolder)}/${fileName}`,
          };
        })
      )
    );
    await writeFile(dataFile, JSON.stringify({ ...data, activities }));
    console.log(
      `🎉 activity data and images saved in ${Date.now() - start}ms.`
    );
  } catch (error) {
    console.error('💣', error);
    process.exit(1);
  }
})();
