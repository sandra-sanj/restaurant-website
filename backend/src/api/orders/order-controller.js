import {
  listAllOrders,
  findOrderById,
  findOrderWithItemsById,
  addOrder,
  updateOrder,
  findOrdersByUserId,
  removeOrder,
} from './order-model.js';

// GET all orders (Admin only)
const getAllOrders = async (req, res, next) => {
  try {
    // Authentication check now handled by middleware
    const orders = await listAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders: ', error);
    next(error);
  }
};

// GET order by ID
const getOrdersById = async (req, res, next) => {
  try {
    const order = await findOrderById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error fetching order by ID: ', error);
    next(error);
  }
};

// GET order details with items
const getOrderDetails = async (req, res, next) => {
  try {
    const order = await findOrderWithItemsById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error fetching order details: ', error);
    next(error);
  }
};

// GET user's orders (Customer - can only see their own orders)
const getUsersOrders = async (req, res, next) => {
  try {
    const requestedUserId = parseInt(req.params.userId);
    const loggedInUserId = res.locals.user?.user_id;
    const userRole = res.locals.user?.role;

    // Check if user is trying to access their own orders or is admin
    if (loggedInUserId !== requestedUserId && userRole !== 'admin') {
      const error = new Error('You can only view your own orders');
      error.status = 403;
      return next(error);
    }

    const orders = await findOrdersByUserId(requestedUserId);

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      const error = new Error('Orders not found for this user');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error getting user orders: ', error);
    next(error);
  }
};

// POST create order (Public - guest allowed)
const postOrder = async (req, res, next) => {
  try {
    const orderData = {
      ...req.body,
    };

    // If user is logged in, use their user_id
    if (res.locals.user?.user_id) {
      orderData.user_id = res.locals.user.user_id;
    }

    const result = await addOrder(orderData);

    if (result?.order_id) {
      res.status(201).json({
        message: 'New order created',
        result, // This contains full order details // Guest get this info now, can't view it later without account
      });
    } else {
      const error = new Error('Could not create order');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    console.error('Error creating order: ', error);
    next(error);
  }
};

// PUT update order (Admin only)
const putOrder = async (req, res, next) => {
  try {
    // Authentication check now handled by middleware
    const order = await findOrderById(req.params.id);

    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }

    const result = await updateOrder(req.params.id, req.body);

    if (result) {
      res.status(200).json({
        message: 'Order updated',
        result,
      });
    } else {
      const error = new Error('Could not update order');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    console.error('Error updating order: ', error);
    next(error);
  }
};

// DELETE order (Admin only)
const deleteOrder = async (req, res, next) => {
  try {
    // Authentication check now handled by middleware

    const order = await findOrderById(req.params.id);

    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      return next(error);
    }

    const result = await removeOrder(req.params.id);

    if (result) {
      res.json({
        message: 'Order deleted successfully',
        result,
      });
    } else {
      const error = new Error('Order could not be deleted');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    console.error('Error deleting order: ', error);
    return next(error);
  }
};

export {
  getAllOrders,
  getOrdersById,
  getUsersOrders,
  getOrderDetails,
  postOrder,
  putOrder,
  deleteOrder,
};
