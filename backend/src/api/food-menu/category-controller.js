import {listAllCategories, findCategoryById} from './category-model.js';

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await listAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories: ', error);
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error fetching category: ', error);
    next(error);
  }
};

export {getAllCategories, getCategoryById};
