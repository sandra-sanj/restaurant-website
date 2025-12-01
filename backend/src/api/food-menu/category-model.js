import promisePool from '../../utils/database.js';

// Get all categories
const listAllCategories = async () => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM categories ORDER BY display_order ASC'
  );
  return rows;
};

// Find category by ID
const findCategoryById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {listAllCategories, findCategoryById};
