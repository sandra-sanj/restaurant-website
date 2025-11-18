import {
  listAllOrders,
  findOrderById,
  findOrderWithItemsById,
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

export {getAllOrders, getOrdersById, getOrderDetails};
