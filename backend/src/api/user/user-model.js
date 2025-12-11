import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const result = await promisePool.query('SELECT * FROM users');

  // remove password_hash
  const resultNoPassword = result[0].map((user) => {
    const {password_hash, ...other} = user;
    return other;
  });
  return resultNoPassword;
};

const findUserById = async (id) => {
  const [result] = await promisePool.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );

  if (result.length === 0) {
    return false;
  }

  // remove password_hash
  const {password_hash, ...other} = result[0];
  return other;
};

const findEmail = async (email) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, email FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {username, email, password_hash, phone, address, role, is_active} =
    user;

  const sql = `INSERT INTO users (username, email, password_hash, phone, address, role, is_active)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    username,
    email,
    password_hash,
    phone || null,
    address || null,
    role,
    is_active,
  ];

  const result = await promisePool.execute(sql, params);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {user_id: result[0].insertId};
};

const modifyUser = async (user, id) => {
  if (!Object.keys(user).length) return false;

  const sql = promisePool.format(`UPDATE users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  if (result.changedRows === 0) {
    return false;
  }
  return await findUserById(id);
};

const removeUser = async (id) => {
  // get a connection object from the pool
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = connection.format('DELETE FROM users WHERE user_id = ?', [id]);

    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return 'User not deleted';
    }

    // if no errors, commit the transaction (save changes)
    await connection.commit();

    return 'User deleted';
  } catch (error) {
    // if error, rollback transaction (undo changes)
    await connection.rollback();
    console.error('error', error.message);
    return error.message;
  } finally {
    connection.release();
  }
};

const getUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  listAllUsers,
  findUserById,
  findEmail,
  addUser,
  modifyUser,
  removeUser,
  getUserByUsername,
};
