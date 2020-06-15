require('dotenv').config();

const { promisify } = require('util');
const fs = require('fs');

const { getData, dataFile } = require('../utils/data');

const writeFile = promisify(fs.writeFile);

(async () => {
  try {
    const start = Date.now();
    await writeFile(dataFile, JSON.stringify(await getData(true)));
    console.log(`Success: activity data saved in ${Date.now() - start}ms.`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
