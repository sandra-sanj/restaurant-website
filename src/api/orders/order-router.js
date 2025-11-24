import express from 'express';

import {
  getAllOrders,
  getOrderDetails,
  getOrdersById,
  getUsersOrders,
  postOrder,
  putOrder,
} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(postOrder);

orderRouter.route('/:id').get(getOrdersById).put(putOrder);

orderRouter.route('/:id/details').get(getOrderDetails);

orderRouter.route('/user/:userId').get(getUsersOrders);

export default orderRouter;
