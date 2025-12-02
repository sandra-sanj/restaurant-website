import {findOrderById} from '../api/orders/order-model.js';

const checkOrderAccess = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (!res.locals.user) {
      return res
        .status(401)
        .json({message: 'Authentication required to view orders'});
    }

    const order = await findOrderById(orderId);

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    if (res.locals.user.role === 'admin') {
      return next();
    }

    if (order.user_id === res.locals.user.user_id) {
      return next();
    }

    return res.status(403).json({
      message: 'You can only view your own orders',
    });
  } catch (error) {
    console.error('Error checking order access: ', error);
    res.status(500).json({message: 'Error checking authorization'});
  }
};

export {checkOrderAccess};
