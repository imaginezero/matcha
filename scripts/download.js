const { saveData } = require('../services/data');

(async () => {
  try {
    await saveData();
    console.log('Success: activity data saved.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
