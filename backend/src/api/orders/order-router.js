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

import {authenticateToken} from '../../middlewares/authentication.js';
import {checkAdmin} from '../../middlewares/check-admin.js';
import {checkOrderAccess} from '../../middlewares/check-order-access.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const orderRouter = express.Router();

// Public route (no auth required)
orderRouter.route('/').post(
  body('customer_name')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({min: 2, max: 128})
    .withMessage('Customer name must be 2-100 characters'),

  body('customer_email')
    .trim()
    .notEmpty()
    .withMessage('Customer email is required')
    .isEmail()
    .withMessage('Must be a valid email'),

  body('customer_phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .custom((phone) => {
      if (!phone.startsWith('+358')) {
        throw new Error('Phone number must be Finnish (+358)');
      }
      const phoneNumber = phone.split('+')[1];
      if (isNaN(phoneNumber)) {
        throw new Error('Phone number must contain digits');
      }
      if (phoneNumber.length < 12) {
        throw new Error('Phone number is too short');
      }
      return true;
    }),

  body('order_type')
    .trim()
    .notEmpty()
    .withMessage('Order type is required')
    .isIn(['pickup', 'delivery'])
    .withMessage('Order type must be either pickup or delivery'),

  body('delivery_address')
    .optional()
    .trim()
    .custom((value, {req}) => {
      // If order type is delivery, delivery address is required
      if (req.body.order_type === 'delivery' && !value) {
        throw new Error('Delivery address is required for delivery orders');
      }
      return true;
    }),

  body('items')
    .notEmpty()
    .withMessage('Order must contain at least one item')
    .isArray({min: 1}),

  body('items.*menu_item_id').isInt({min: 1}),
  body('items.*item_name').trim().notEmpty(),
  body('items.*quantity').isInt({min: 1}),
  body('items.*unit_price').isDecimal({force_decimal: true}),
  body('items.*selected_spice_level').optional().isInt(),
  body('items.*selected_protein').optional().trim().isString(),
  body('items.*special_requests').optional().trim().isString(),
  body('user_id').optional().isInt(),

  validationErrors,
  postOrder
);

// Admin only routes (admin can view all orders)
orderRouter.route('/').get(authenticateToken, checkAdmin, getAllOrders);

// Protected route (user must be logged in), users own orders
orderRouter.route('/user/:userId').get(authenticateToken, getUsersOrders);

// Individual order routes
orderRouter
  .route('/:id')
  .get(authenticateToken, checkOrderAccess, getOrdersById)
  .put(authenticateToken, checkAdmin, putOrder)
  .delete(authenticateToken, checkAdmin, deleteOrder);

orderRouter
  .route('/:id/details')
  .get(authenticateToken, checkOrderAccess, getOrderDetails);

export default orderRouter;
