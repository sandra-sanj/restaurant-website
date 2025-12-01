import {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
} from './food-menu-model.js';

const verifyUserAccess = async (logged_in_user) => {
  // TODO: combine error messages to one for better security ("User not found or no permission to modify user")
  // TODO: better error messages as this method is used elsewhere too, such as menu, orders, etc.

  // check user validity
  if (!logged_in_user) {
    return {ok: false, status: 404, message: 'User not found'};
  }

  // check if token (logged in user) can modify user
  if (logged_in_user.role !== 'admin') {
    return {
      ok: false,
      status: 401,
      message: 'User cannot modify this menu item',
    };
  }

  return {ok: true};
};

const getMenuItems = async (req, res, next) => {
  const result = await listAllMenuItems();

  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200).json(result);

  /* if (menuItems) {
    res.status(200).json(menuItems);
  } else {
    res.status(404).json({message: 'Could not get menu'});
  } */
};

const getMenuItemById = async (req, res, next) => {
  const result = await findMenuItemById(req.params.id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Could not find item');
    error.status = 404;
    return next(error);
  }
  res.status(200).json(result);

  /* if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({message: 'Could not find item'});
  } */
};

const postMenuItem = async (req, res, next) => {
  console.log(req.file);
  // check if file exists
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  const menuItemData = {
    ...req.body,
  };
  //console.log(menuItemData);
  menuItemData.image_url = req.file.filename;
  menuItemData.image_thumb_url = req.file.thumbFilename;
  //console.log(menuItemData);

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  // check user and token validity
  const validAccess = await verifyUserAccess(res.locals.user);
  if (!validAccess.ok) {
    const error = new Error(validAccess.message);
    error.status = validAccess.status;
    return next(error);
    //return res.status(valid.status).json({message: valid.message});
  }

  const result = await addMenuItem(menuItemData);

  /* if (result?.menu_item_id) {
    res.status(201).json({message: 'New menu item added', result});
  } else {
    res.status(400).json({message: 'Could not add menu item'});
  } */

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Could not add menu item');
    error.status = 400;
    return next(error);
  }
  res.status(201).json({message: 'New menu item added', result});
};

const putMenuItem = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  const menuItem = await findMenuItemById(req.params.id);
  if (!menuItem) {
    const error = new Error('Menu item not found');
    error.status = 401;
    return next(error);
    //return res.status(401).json({message: 'Menu item not found'});
  }

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  const validAccess = await verifyUserAccess(res.locals.user);
  if (!validAccess.ok) {
    const error = new Error(validAccess.message);
    error.status = validAccess.status;
    return next(error);
    //return res.status(valid.status).json({message: valid.message});
  }

  // modify menu item
  const result = await modifyMenuItem(req.body, menuItem.menu_item_id);
  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('No updates done');
    error.status = 404;
    return next(error);
  }
  res.status(201).json({message: 'Menu item updated', result});

  /* console.log(result);
  if (result) {
    res.status(201).json({message: 'Menu item updated', result});
  } else {
    res.status(404).json({message: 'No updates done'});
  } */
};

const deleteMenuItem = async (req, res) => {
  /* const menuItem = await findMenuItemById(req.params.id);

  if (!menuItem) {
    return res.status(401).json({message: 'Menu item not found'});
  } */

  const menuItem = await findMenuItemById(req.params.id);
  if (!menuItem) {
    const error = new Error('Menu item not found');
    error.status = 401;
    return next(error);
    //return res.status(401).json({message: 'Menu item not found'});
  }

  // check if user is admin
  /*if (res.locals.user?.role !== 'admin') {
    return res.status(403).json({message: 'User cannot modify this menu item'});
  }*/

  const validAccess = await verifyUserAccess(res.locals.user);
  if (!validAccess.ok) {
    const error = new Error(validAccess.message);
    error.status = validAccess.status;
    return next(error);
    //return res.status(valid.status).json({message: valid.message});
  }

  /* const result = await removeMenuItem(req.params.id);
  if (result) {
    res.status(200).json({message: 'Menu item deleted', result});
  } else {
    res.status(404).json({message: 'Menu item not deleted'});
  } */

  const result = await removeMenuItem(req.params.id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Menu item not deleted');
    error.status = 404;
    return next(error);
  }
  res.status(201).json({message: 'Menu item deleted', result});
};

export {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
};
