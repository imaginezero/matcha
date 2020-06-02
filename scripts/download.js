require('dotenv').config();

const { saveData } = require('../services/data');

(async () => {
  try {
    const start = Date.now();
    await saveData();
    console.log(`Success: activity data saved in ${Date.now() - start}ms.`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
