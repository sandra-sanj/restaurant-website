import express from 'express';

import {
  getAllOrders,
  getOrderDetails,
  getOrdersById,
  getUsersOrders,
  postOrder,
  putOrder,
  deleteOrder,
} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(postOrder);

orderRouter.route('/:id').get(getOrdersById).put(putOrder).delete(deleteOrder);

orderRouter.route('/:id/details').get(getOrderDetails);

orderRouter.route('/user/:userId').get(getUsersOrders);

export default orderRouter;
