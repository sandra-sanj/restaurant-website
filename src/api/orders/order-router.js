import express from 'express';

import {getAllOrders, getOrdersById} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders);

orderRouter.route('/:id').get(getOrdersById);

export default orderRouter;
