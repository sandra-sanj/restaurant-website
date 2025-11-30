import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
} from './food-menu-controller.js';

const foodMenuRouter = express.Router();

// TODO: modify post, put and delete to require authentication from user with admin role

foodMenuRouter.route('/').get(getMenuItems).post(postMenuItem);

foodMenuRouter
  .route('/:id')
  .get(getMenuItemById)
  .put(putMenuItem)
  .delete(deleteMenuItem);

export default foodMenuRouter;
