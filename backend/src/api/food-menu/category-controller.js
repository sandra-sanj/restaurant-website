import {listAllCategories, findCategoryById} from './category-model.js';

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await listAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories: ', error);
    res.status(500).json({message: 'Error fetching categories'});
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({message: 'Category not found'});
    }
  } catch (error) {
    console.error('Error fetching category: ', error);
    res.status(500).json({message: 'Error fetching category'});
  }
};

export {getAllCategories, getCategoryById};
