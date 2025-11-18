import promisePool from '../../utils/database.js';

const listAllOrders = async () => {
  const result = await promisePool.execute(
    `SELECT * FROM orders ORDER BY created_at DESC`
  );
  const rows = result[0];
  return rows;
};

export {listAllOrders};
