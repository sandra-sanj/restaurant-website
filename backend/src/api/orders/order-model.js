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

const findOrdersByUserId = async (userId) => {
  const [orders] = await promisePool.execute(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );

  // Get items for each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const [items] = await promisePool.execute(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.order_id]
      );
      return {
        ...order,
        items: items,
      };
    })
  );
  return ordersWithItems;
};

const addOrder = async (order) => {
  const {
    user_id,
    customer_name,
    customer_email,
    customer_phone,
    delivery_address,
    order_type,
    items,
  } = order;

  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    // Calculate total price from items
    const total_price = items.reduce((total, item) => {
      return total + item.unit_price * item.quantity;
    }, 0);

    console.log('Calculated total :', total_price);
    // Insert the main order
    const orderSql = `INSERT INTO orders
    (user_id, order_status, total_price, customer_name, customer_email, customer_phone, delivery_address, order_type) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)`;

    const orderParams = [
      user_id || null,
      'pending',
      total_price,
      customer_name,
      customer_email,
      customer_phone,
      delivery_address,
      order_type,
    ];

    const [orderResult] = await connection.execute(orderSql, orderParams);

    console.log('orderresult', orderResult);

    if (orderResult.affectedRows === 0) {
      return false;
    }

    const orderId = orderResult.insertId;

    for (const item of items) {
      const itemSql = `INSERT INTO order_items
      (order_id, menu_item_id, item_name, selected_protein, selected_spice_level, quantity, unit_price, special_requests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const itemParams = [
        orderId,
        item.menu_item_id,
        item.item_name,
        item.selected_protein || null,
        item.selected_spice_level || null,
        item.quantity,
        item.unit_price,
        item.special_requests || null,
      ];

      const [itemResult] = await connection.execute(itemSql, itemParams);

      if (itemResult.affectedRows === 0) {
        return false;
      }
    }

    await connection.commit();

    // Return the complete order with its items
    return await findOrderWithItemsById(orderId);
  } catch (error) {
    await connection.rollback();
    console.error('Error', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

const updateOrder = async (id, order) => {
  const sql = promisePool.format(`UPDATE orders SET ? WHERE order_id = ?`, [
    order,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  console.log('Update result', result);

  if (result.affectedRows === 0) {
    return false;
  }

  return await findOrderById(id);
};

const removeOrder = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM orders WHERE order_id = ?',
    [id]
  );
  console.log('delete result', result);

  if (result.affectedRows === 0) {
    return false;
  }

  return {message: 'Order deleted successfully'};
};

export {
  listAllOrders,
  findOrderById,
  findOrderWithItemsById,
  findOrdersByUserId,
  addOrder,
  updateOrder,
  removeOrder,
};
