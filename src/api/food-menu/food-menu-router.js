import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
} from './food-menu-controller.js';

const foodMenuRouter = express.Router();

foodMenuRouter.route('/').get(getMenuItems).post(postMenuItem);

foodMenuRouter.route('/:id').get(getMenuItemById); //.put(putCat).delete(deleteCat);

export default foodMenuRouter;
