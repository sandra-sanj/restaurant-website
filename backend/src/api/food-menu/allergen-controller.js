import {
  listAllAllergens,
  findAllergenById,
  findAllergensByMenuItemId,
} from './allergen-model.js';

// Get all allergens
const getAllAllergens = async (req, res) => {
  try {
    const allergens = await listAllAllergens();
    res.json(allergens);
  } catch (error) {
    console.error('Error fetching allergens: ', error);
    res.status(500).json({message: 'Error fetching allergens'});
  }
};

// Get allergen by ID
const getAllergenById = async (req, res) => {
  try {
    const allergen = await findAllergenById(req.params.id);

    if (allergen) {
      res.status(200).json(allergen);
    } else {
      res.status(404).json({message: 'Allergen not found'});
    }
  } catch (error) {
    console.error('Error fetching allergen: ', error);
    res.status(500).json({message: 'Error fetching allergen'});
  }
};

// Get allergens for specific menu item
const getMenuItemAllergens = async (req, res) => {
  try {
    const allergens = await findAllergensByMenuItemId(req.params.menuItemId);

    if (allergens.length > 0) {
      res.json(allergens);
    } else {
      res.status(404).json({message: 'No allergens found for this menu item'});
    }
  } catch (error) {
    console.error('Error fetching allergens for menu item: ', error);
    res.status(500).json({message: 'Error fetching allergens menu item '});
  }
};

export {getAllAllergens, getAllergenById, getMenuItemAllergens};
