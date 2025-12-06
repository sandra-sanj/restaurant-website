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
  //console.log('rows', rows);
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
  //console.log('result', result);

  if (result[0].affectedRows === 0) {
    return false;
  }
  return await findMenuItemById(result[0].insertId);
};

const modifyMenuItem = async (menuItem, id) => {
  const sql = promisePool.format(
    `UPDATE menu_items SET ? WHERE menu_item_id = ?`,
    [menuItem, id]
  );

  const [result] = await promisePool.query(sql);
  if (result.changedRows === 0) {
    return false;
  }
  return await findMenuItemById(id);
};

const removeMenuItem = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM menu_items WHERE menu_item_id = ?',
    [id]
  );
  //console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

//const listAvailableMenuItems

export {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
};
