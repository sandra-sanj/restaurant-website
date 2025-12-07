import promisePool from '../src/utils/database.js';

// Add test item to database:
// in terminal, run: cd backend -> node <file-path>
// esim. node .\test\test-add-item.js

(async () => {
  try {
    const [result] = await promisePool.execute(
      `INSERT INTO menu_items
      (category_id, name, name_en, description, description_en, price, is_available)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [3, 'Joku testijälkkäri', 'Test dessert EN', 'Kuvaus jotain jeejee', 'Description EN here', 11.9, 1]
    );
    console.log('Added item ID:', result.insertId);
  } catch (err) {
    console.error('Add item failed:', err);
  } finally {
    process.exit();
  }
})();
