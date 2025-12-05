import promisePool from '../src/utils/database.js';

(async () => {
  try {
    const [result] = await promisePool.execute(
      `INSERT INTO menu_items
      (category_id, name, name_en, description, description_en, price, is_available)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [1, 'Testi Taco', 'Test Taco EN', 'Kuvaus', 'Description EN', 5.9, 1]
    );
    console.log('Lisätty rivi ID:', result.insertId);
  } catch (err) {
    console.error('Lisäys epäonnistui:', err);
  } finally {
    process.exit();
  }
})();
