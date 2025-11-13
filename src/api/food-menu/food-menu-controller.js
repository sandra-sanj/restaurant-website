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

  const result = await addMenuItem(menuItemData);

  if (result?.menu_item_id) {
    res.status(201).json({message: 'New menu item added', result});
  } else {
    res.status(400).json({message: 'Could not add menu item'});
  }
};

/*const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  // not implemented in this example, this is homework
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is homework
  res.sendStatus(200);
};*/

export {getMenuItems, getMenuItemById, postMenuItem};
