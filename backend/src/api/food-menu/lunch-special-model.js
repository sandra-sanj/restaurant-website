import promisePool from '../../utils/database.js';

// Get all lunch specials
const listAllLunchSpecials = async () => {
  const [rows] = await promisePool.execute(
    `SELECT lunch_specials.*,
     menu_items.name,
     menu_items.name_en,
     menu_items.description,
     menu_items.description_en,
     menu_items.price AS regular_price,
     menu_items.image_url,
     menu_items.image_thumb_url,
     menu_items.ingredients,
     menu_items.spice_level
     FROM lunch_specials
     JOIN menu_items ON lunch_specials.menu_item_id = menu_items.menu_item_id
     WHERE lunch_specials.is_active = TRUE ORDER BY
     FIELD(lunch_specials.day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday')`
  );
  return rows;
};

// Get lunch special for specific day
const findLunchSpecialByDay = async (day) => {
  const [rows] = await promisePool.execute(
    `SELECT lunch_specials.*,
     menu_items.name,
     menu_items.name_en,
     menu_items.description,
     menu_items.description_en,
     menu_items.price AS regular_price,
     menu_items.image_url,
     menu_items.image_thumb_url,
     menu_items.ingredients,
     menu_items.spice_level
     FROM lunch_specials
     JOIN menu_items ON lunch_specials.menu_item_id = menu_items.menu_item_id
     WHERE lunch_specials.day_of_week = ? AND lunch_specials.is_active = TRUE`,
    [day]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

// Get today's lunch
const findTodaysLunchSpecial = async () => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const today = days[new Date().getDay()];

  if (today === 'saturday' || today === 'sunday') {
    return false;
  }

  const [rows] = await promisePool.execute(
    `SELECT lunch_specials.*,
     menu_items.name,
     menu_items.name_en,
     menu_items.description,
     menu_items.description_en,
     menu_items.price AS regular_price,
     menu_items.image_url,
     menu_items.image_thumb_url,
     menu_items.ingredients,
     menu_items.spice_level
     FROM lunch_specials
     JOIN menu_items ON lunch_specials.menu_item_id = menu_items.menu_item_id
     WHERE lunch_specials.day_of_week = ? AND lunch_specials.is_active = TRUE`,
    [today]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {listAllLunchSpecials, findLunchSpecialByDay, findTodaysLunchSpecial};
