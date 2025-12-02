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
const getAllOrders = async (req, res) => {
  try {
    // Authentication check now handled by middleware
    const orders = await listAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error getting all orders: ', error);
    res.status(500).json({message: 'Error fetching orders'});
  }
};

// GET order by ID
const getOrdersById = async (req, res) => {
  try {
    const order = await findOrderById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({message: 'Order not found'});
    }
  } catch (error) {
    console.error('Error fetching order: ', error);
    res.status(500).json({message: 'Error fetching order'});
  }
};

// GET order details with items
const getOrderDetails = async (req, res) => {
  try {
    const order = await findOrderWithItemsById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({message: 'Order not found'});
    }
  } catch (error) {
    console.error('Error fetching order details: ', error);
    res.status(500).json({message: 'Error fetching order details'});
  }
};

// GET user's orders (Customer - can only see their own orders)
const getUsersOrders = async (req, res) => {
  try {
    const requestedUserId = parseInt(req.params.userId);
    const loggedInUserId = res.locals.user?.user_id;
    const userRole = res.locals.user?.role;

    // Check if user is trying to access their own orders or is admin
    if (loggedInUserId !== requestedUserId && userRole !== 'admin') {
      return res
        .status(403)
        .json({message: 'You can only view your own orders'});
    }

    const orders = await findOrdersByUserId(requestedUserId);

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({message: 'No orders found for this user.'});
    }
  } catch (error) {
    console.error('Error getting user orders: ', error);
    res.status(500).json({message: 'Error fetching user orders'});
  }
};

// POST create order (Public - guest allowed)
const postOrder = async (req, res) => {
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
      res.status(400).json({message: 'Could not create order'});
    }
  } catch (error) {
    console.error('Error creating order: ', error);
    res.status(500).json({message: 'Error creating order'});
  }
};

// PUT update order (Admin only)
const putOrder = async (req, res) => {
  try {
    // Authentication check now handled by middleware
    const order = await findOrderById(req.params.id);

    if (!order) {
      res.status(404).json({message: 'Order not found'});
      return;
    }

    const result = await updateOrder(req.params.id, req.body);

    if (result) {
      res.status(200).json({
        message: 'Order updated',
        result,
      });
    } else {
      res.status(400).json({message: 'Could not update order'});
    }
  } catch (error) {
    console.error('Error updating order: ', error);
    res.status(500).json({message: 'Error updating order'});
  }
};

// DELETE order (Admin only)
const deleteOrder = async (req, res) => {
  try {
    // Authentication check now handled by middleware

    const order = await findOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    const result = await removeOrder(req.params.id);

    if (result) {
      res.json({
        message: 'Order deleted successfully',
        result,
      });
    } else {
      res.status(400).json({message: 'Order could not be deleted'});
    }
  } catch (error) {
    console.error('Error deleting order: ', error);
    res.status(500).json({message: 'Error deleting order'});
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
