import promisePool from '../../utils/database.js';

const listAllMenuItems = async () => {
  const result = await promisePool.execute(`SELECT * FROM menu_items;`);
  const rows = result[0];
  return rows;
};

const findMenuItemById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT * FROM menu_items WHERE menu_item_id = ?;`,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addMenuItem = async (menuItem) => {
  const {
    category_id,
    name,
    name_en,
    description,
    description_en,
    price,
    ingredients,
    spice_level,
    allows_spice_custom,
    available_proteins,
    default_protein,
    image_url,
    image_thumb_url,
    is_available,
  } = menuItem;

  const sql = `INSERT INTO menu_items (category_id, name, name_en, description, description_en, price, ingredients, spice_level, allows_spice_custom, available_proteins, default_protein, image_url, image_thumb_url, is_available)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    category_id,
    name,
    name_en,
    description,
    description_en,
    price,
    ingredients,
    spice_level,
    allows_spice_custom,
    available_proteins,
    default_protein,
    image_url,
    image_thumb_url,
    is_available,
  ];

  const result = await promisePool.execute(sql, params);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return await findMenuItemById(result[0].insertId);
};

const modifyMenuItem = async (menuItem, id) => {
  let {allergen_ids, ...menuItemData} = menuItem;

  if (allergen_ids && typeof allergen_ids === 'string') {
    allergen_ids = JSON.parse(allergen_ids);
  }

  // try to update menu item
  if (Object.keys(menuItemData).length > 0) {
    const sql = promisePool.format(
      `UPDATE menu_items SET ? WHERE menu_item_id = ?`,
      [menuItemData, id]
    );
    await promisePool.query(sql);
  }

  // try to update allergens
  if (allergen_ids) {
    // delete old allergens
    await promisePool.query(
      `DELETE FROM menu_item_allergen WHERE menu_item_id = ?`,
      [id]
    );

    // insert new allergens
    if (allergen_ids.length > 0) {
      const values = allergen_ids.map((a) => [id, parseInt(a)]);
      const sqlAllergens = `INSERT INTO menu_item_allergen (menu_item_id, allergen_id) VALUES ?`;
      await promisePool.query(sqlAllergens, [values]);
    }
  }

  return await findMenuItemById(id);
};

const removeMenuItem = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM menu_items WHERE menu_item_id = ?',
    [id]
  );

  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
};
