// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

/*const listAllUsers = async () => {
  // TODO: remove this request or heavily limit it
  const result = await promisePool.query('SELECT * FROM users');
  return result[0];
};*/

const findUserById = async (id) => {
  const [result] = await promisePool.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );

  if (result.length === 0) {
    return false;
  }
  return result[0];
};

const addUser = async (user) => {
  const {username, email, password_hash, phone, role, is_active} = user;

  const sql = `INSERT INTO users (username, email, password_hash, phone, role, is_active)
               VALUES (?, ?, ?, ?, ?, ?)`;

  const params = [username, email, password_hash, phone, role, is_active];
  const result = await promisePool.execute(sql, params);
  //console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {user_id: result[0].insertId};
  //return await findUserById(result[0].insertId);
};

const modifyUser = async (user, id) => {
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

// TODO: remove user_id foreign key from orders table (but keep the order in history)
const removeUser = async (id) => {
  // get a connection object from the pool
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    //await connection.execute('DELETE FROM wsk_cats WHERE owner = ?;', [id]);
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
  //console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

export {
  //listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  getUserByUsername,
};
