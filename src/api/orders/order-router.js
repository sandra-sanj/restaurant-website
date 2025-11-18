import express from 'express';
import {getAllOrders} from './order-controller.js';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders);

export default orderRouter;
