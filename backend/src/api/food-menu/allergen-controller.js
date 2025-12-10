import {
  listAllAllergens,
  findAllergenById,
  findAllergensByMenuItemId,
} from './allergen-model.js';

// Get all allergens
const getAllAllergens = async (req, res, next) => {
  try {
    const allergens = await listAllAllergens();
    res.json(allergens);
  } catch (error) {
    console.error('Error fetching allergens: ', error);
    next(error);
  }
};

// Get allergen by ID
const getAllergenById = async (req, res, next) => {
  try {
    const allergen = await findAllergenById(req.params.id);

    if (allergen) {
      res.status(200).json(allergen);
    } else {
      const error = new Error('Allergen not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error fetching allergen: ', error);
    next(error);
  }
};

// Get allergens for specific menu item
const getMenuItemAllergens = async (req, res, next) => {
  try {
    const allergens = await findAllergensByMenuItemId(req.params.menuItemId);

    // allergens can be empty as not all items have allergens
    res.status(200).json(allergens);

    /* if (allergens.length > 0) {
      res.json(allergens);
    } else {
      const error = new Error('No allergens found for this menu item');
      error.status = 404;
      return next(error);
    } */
  } catch (error) {
    console.error('Error fetching allergens for menu item: ', error);
    next(error);
  }
};

export {getAllAllergens, getAllergenById, getMenuItemAllergens};
