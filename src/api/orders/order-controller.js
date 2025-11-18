import {listAllOrders} from './order-model.js';

const getAllOrders = async (req, res) => {
  res.json(await listAllOrders());
};

export {getAllOrders};
