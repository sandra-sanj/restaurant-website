//import promisePool from '../../utils/database.js';

// mock data
const menuItems = [
  {
    menu_item_id: 1,
    category_id: 1,
    name: 'Soup',
    description: 'Healthy soup',
    price: 10.4,
    ingredients: 'water, potato, carrot',
    spice_level: 2,
    image_url: 'image.jpeg',
    is_available: true,
    created_at: '2025-11-10',
    updated_at: '2025-11-11',
  },
  {
    menu_item_id: 2,
    category_id: 2,
    name: 'Bread',
    description: 'Filling bread',
    price: 3.1,
    ingredients: 'water, flour, yeast',
    spice_level: 0,
    image_url: 'image.jpeg',
    is_available: true,
    created_at: '2025-11-10',
    updated_at: '2025-11-11',
  },
  {
    menu_item_id: 3,
    category_id: 2,
    name: 'Raisin Bread',
    description: 'Delicious sweet raisin bread',
    price: 3.8,
    ingredients: 'water, flour, raisins, yeast',
    spice_level: 0,
    image_url: 'image.jpeg',
    is_available: false,
    created_at: '2025-11-10',
    updated_at: '2025-11-11',
  },
  {
    menu_item_id: 4,
    category_id: 1,
    name: 'Soda',
    description: 'Soda drink',
    price: 2.2,
    ingredients: 'water, sugar, flavoring',
    spice_level: 0,
    image_url: 'image.jpeg',
    is_available: true,
    created_at: '2025-11-10',
    updated_at: '2025-11-11',
  },
];

// listAllMenuItems, findMenuItemById, addMenuItem, modifyMenuItem, removeMenuItem

const listAllMenuItems = async () => {
  return menuItems;

  /*const result = await promisePool.execute(
    `
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id;
  `
  );
  const rows = result[0];
  return rows;*/
};

const findMenuItemById = async (id) => {
  return menuItems.find((item) => item.menu_item_id == id);
  /*const [rows] = await promisePool.execute(
    `
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
    WHERE wsk_cats.cat_id = ?;
  `,
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];*/
};

const addMenuItem = async (menuItem) => {
  const newItem = {
    category_id: 1,
    name: 'Soda',
    description: 'Soda drink',
    price: 2.2,
    ingredients: 'water, sugar, flavoring',
    spice_level: 0,
    image_url: 'image.jpeg',
    is_available: true,
    created_at: '2025-11-10',
    updated_at: '2025-11-11',
  };

  const {
    category_id,
    name,
    description,
    price,
    ingredients,
    spice_level,
    image_url,
    is_available,
    created_at,
    updated_at,
  } = newItem;

  const newId = menuItems[0].menu_item_id + 1;
  menuItems.unshift({
    menu_item_id: newId,
    category_id,
    name,
    description,
    price,
    ingredients,
    spice_level,
    image_url,
    is_available,
    created_at,
    updated_at,
  });

  return {menu_item_id: newId};
  /*const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const result = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: result[0].insertId};*/
};

const modifyMenuItem = async (cat, id) => {
  /*const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  if (result.changedRows === 0) {
    return false;
  }
  return {message: 'success'};*/
};

const removeMenuItem = async (id) => {
  /*const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};*/
};

//const listAvailableMenuItems

export {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
};
