import {findOrderById} from '../api/orders/order-model.js';

/**
 * Middleware to check if user can access an order
 * - Admin can access any order
 * - User can access their own orders
 * - Guest orders: Cannot be viewed after creation (must login)
 */

const checkOrderAccess = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    // Must be authenticated
    if (!res.locals.user) {
      return res
        .status(401)
        .json({message: 'Authentication required to view orders'});
    }

    const order = await findOrderById(orderId);

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    // Admin can access any order
    if (res.locals.user.role === 'admin') {
      return next();
    }

    // User can access their own orders
    if (order.user_id === res.locals.user.user_id) {
      return next();
    }

    // Otherwise deny access
    return res.status(403).json({
      message: 'You can only view your own orders',
    });
  } catch (error) {
    console.error('Error checking order access: ', error);
    res.status(500).json({message: 'Error checking authorization'});
  }
};

export {checkOrderAccess};
