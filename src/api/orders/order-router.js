import express from 'express';

import {
  getAllOrders,
  getOrderDetails,
  getOrdersById,
} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders);

orderRouter.route('/:id').get(getOrdersById);

orderRouter.route('/:id/details').get(getOrderDetails);

export default orderRouter;
