import promisePool from '../../utils/database.js';

const listAllOrders = async () => {
  const result = await promisePool.execute(
    `SELECT * FROM orders ORDER BY created_at DESC`
  );
  const rows = result[0];
  return rows;
};

const findOrderById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT * FROM orders WHERE order_id = ?`,
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findOrderWithItemsById = async (id) => {
  // Get the order
  const [orderRows] = await promisePool.execute(
    `SELECT * FROM orders WHERE order_id = ?`,
    [id]
  );

  if (orderRows.length === 0) {
    return false;
  }

  const order = orderRows[0];

  // Get order items
  const [itemRows] = await promisePool.execute(
    `SELECT * FROM order_items WHERE order_id = ?`,
    [id]
  );

  // Combine order with its items
  return {
    ...order,
    items: itemRows,
  };
};

export {listAllOrders, findOrderById, findOrderWithItemsById};
