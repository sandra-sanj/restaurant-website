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

export {listAllOrders, findOrderById};
