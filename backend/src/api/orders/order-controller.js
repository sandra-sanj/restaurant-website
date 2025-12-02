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

const getUsersOrders = async (req, res) => {
  try {
    const orders = await findOrdersByUserId(req.params.userId);

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

const postOrder = async (req, res) => {
  const orderData = {
    ...req.body,
  };

  const result = await addOrder(orderData);

  if (result?.order_id) {
    res.status(201).json({
      message: 'New order created',
      result,
    });
  } else {
    res.status(400).json({message: 'Could not create order'});
  }
};

const putOrder = async (req, res) => {
  const order = await findOrderById(req.params.id);

  if (!order) {
    res.status(404).json({message: 'Order not found'});
    return;
  }

  /* TODO: check if user is admin (add authentication later)
  if (res.locals.user?.role !== 'admin') {
    return res
      .status(403)
      .json({message: 'Admin access required to update orders'});
  }
  */

  const result = await updateOrder(req.params.id, req.body);

  if (result) {
    res.status(200).json({
      message: 'Order updated',
      result,
    });
  } else {
    res.status(400).json({message: 'Could not update order'});
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await findOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }

    /* TODO: check if user is admin (add authentication later)
      if (res.locals.user?.role !== 'admin') {
        return res
          .status(403)
          .json({message: 'Admin access required to delete orders'});
      }
    */

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
