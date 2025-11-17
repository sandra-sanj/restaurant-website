import {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
} from './food-menu-model.js';

const getMenuItems = async (req, res) => {
  res.json(await listAllMenuItems());
};

const getMenuItemById = async (req, res) => {
  const item = await findMenuItemById(req.params.id);

  if (item) {
    res.status(201).json(item);
  } else {
    res.status(404).json({message: 'Could not find item'});
  }
};

const postMenuItem = async (req, res) => {
  const menuItemData = {
    ...req.body,
  };

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  const result = await addMenuItem(menuItemData);

  if (result?.menu_item_id) {
    res.status(201).json({message: 'New menu item added', result});
  } else {
    res.status(400).json({message: 'Could not add menu item'});
  }
};

const putMenuItem = async (req, res) => {
  const menuItem = await findMenuItemById(req.params.id);

  if (!menuItem) {
    return res.status(401).json({message: 'Menu item not found'});
  }

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  // modify menu item
  const result = await modifyMenuItem(req.body, menuItem.menu_item_id);
  console.log(result);
  if (result) {
    res.status(201).json({message: 'Menu item updated', result});
  } else {
    res.status(404).json({message: 'No updates done'});
  }
};

const deleteMenuItem = async (req, res) => {
  const menuItem = await findMenuItemById(req.params.id);

  if (!menuItem) {
    return res.status(401).json({message: 'Menu item not found'});
  }

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  const result = await removeMenuItem(req.params.id);
  if (result) {
    res.status(200).json({message: 'Menu item deleted', result});
  } else {
    res.status(404).json({message: 'Menu item not deleted'});
  }
};

export {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
};
