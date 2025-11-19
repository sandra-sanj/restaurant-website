import {
  listAllOrders,
  findOrderById,
  findOrderWithItemsById,
  addOrder,
} from './order-model.js';

const getAllOrders = async (req, res) => {
  res.json(await listAllOrders());
};

const getOrdersById = async (req, res) => {
  const order = await findOrderById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({message: 'Order not found'});
  }
};

const getOrderDetails = async (req, res) => {
  const order = await findOrderWithItemsById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({message: 'Order not found'});
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

export {getAllOrders, getOrdersById, getOrderDetails, postOrder};
