import promisePool from '../src/utils/database.js';

(async () => {
  try {
    const [rows] = await promisePool.execute('SELECT NOW()');
    console.log('DB connection works:', rows);
  } catch (err) {
    console.error('DB connection failed:', err);
  } finally {
    process.exit();
  }
})();
