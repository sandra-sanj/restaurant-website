import promisePool from '../../utils/database.js';

// Get all allergens
const listAllAllergens = async () => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM allergens ORDER BY name'
  );
  return rows;
};

// Find allergen by ID
const findAllergenById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM allergens WHERE allergen_id = ?',
    [id]
  );

  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

// Get allergens for a specific menu item
const findAllergensByMenuItemId = async (menuItemId) => {
  const [rows] = await promisePool.execute(
    'SELECT allergens.allergen_id, allergens.name, allergens.code FROM allergens JOIN menu_item_allergen ON allergens.allergen_id = menu_item_allergen.allergen_id WHERE menu_item_allergen.menu_item_id = ?',
    [menuItemId]
  );
  return rows;
};
export {listAllAllergens, findAllergenById, findAllergensByMenuItemId};
