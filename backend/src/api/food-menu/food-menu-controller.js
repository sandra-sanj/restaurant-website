import {
  listAllMenuItems,
  findMenuItemById,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
} from './food-menu-model.js';

const getMenuItems = async (req, res, next) => {
  const result = await listAllMenuItems();

  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200).json({result});
};

const getMenuItemById = async (req, res, next) => {
  const result = await findMenuItemById(req.params.id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Could not find menu item');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({result});
};

const postMenuItem = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  // check if logged in user exists (from token)
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // check if user is admin
  if (res.locals.user.role !== 'admin') {
    const error = new Error('This user cannot post menu item');
    error.status = 403;
    return next(error);
  }

  //console.log(req.file);
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
  menuItemData.image_thumb_url = req.file.thumbFilename || req.file.filename; // Use original file name if thumbnail fails
  //console.log(menuItemData);

  const result = await addMenuItem(menuItemData);

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
  const loggedInUser = res.locals.user;

  const menuItemData = {
    ...req.body,
  };

  if (req.file) {
    menuItemData.image_url = req.file.filename;
    menuItemData.image_thumb_url = req.file.thumbFilename;
  }

  const menuItem = await findMenuItemById(req.params.id);
  if (!menuItem) {
    const error = new Error('Menu item not found');
    error.status = 404;
    return next(error);
  }

  // check if logged in user exists
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // allow admin to modify item
  if (loggedInUser.role !== 'admin') {
    const error = new Error('This user cannot modify menu items');
    error.status = 403;
    return next(error);
  }

  // modify menu item
  const result = await modifyMenuItem(menuItemData, menuItem.menu_item_id);
  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('No updates done');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'Menu item updated', result});
};

const deleteMenuItem = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  const menuItem = await findMenuItemById(req.params.id);
  if (!menuItem) {
    const error = new Error('Menu item not found');
    error.status = 404;
    return next(error);
  }

  // check if logged in user exists
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // allow admin access only
  if (loggedInUser.role !== 'admin') {
    const error = new Error('This user cannot delete menu items');
    error.status = 403;
    return next(error);
  }

  const result = await removeMenuItem(req.params.id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Menu item not deleted');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'Menu item deleted', result});
};

export {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
};
