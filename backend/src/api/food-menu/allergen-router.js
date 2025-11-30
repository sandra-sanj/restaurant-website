import express from 'express';

import {
  getAllAllergens,
  getAllergenById,
  getMenuItemAllergens,
} from './allergen-controller.js';

const allergenRouter = express.Router();

allergenRouter.route('/').get(getAllAllergens);
allergenRouter.route('/:id').get(getAllergenById);
allergenRouter.route('/menu-item/:menuItemId').get(getMenuItemAllergens);

export default allergenRouter;
