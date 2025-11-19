import express from 'express';

import {
  getAllOrders,
  getOrderDetails,
  getOrdersById,
  postOrder,
} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(postOrder);

orderRouter.route('/:id').get(getOrdersById);

orderRouter.route('/:id/details').get(getOrderDetails);

export default orderRouter;
