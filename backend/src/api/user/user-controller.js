import {
  listAllUsers,
  findUserById,
  findEmail,
  addUser,
  modifyUser,
  removeUser,
  getUserByUsername,
} from './user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashFormatPassword = async (password) => {
  return await bcrypt.hash(password, 10); //bcrypt.hashSync(password, 10);
};

const getUsers = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  if (loggedInUser.role !== 'admin') {
    const error = new Error('User cannot access this resource');
    error.status = 403;
    return next(error);
  }

  const result = await listAllUsers();

  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200).json({result});
};

const getUserById = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  // check if logged in user exists (from token)
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // check if user is deleting themselves or is admin
  if (
    Number(req.params.id) !== loggedInUser.user_id &&
    res.locals.user.role !== 'admin'
  ) {
    const error = new Error('User cannot get this user');
    error.status = 403;
    return next(error);
  }

  const result = await findUserById(req.params.id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Could not find user');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({result});
};

const postUser = async (req, res, next) => {
  // modify password to hash format before it is added to the database
  req.body.password_hash = await hashFormatPassword(req.body.password);
  delete req.body.password;

  // default values
  req.body.role = req.body.role || 'customer';
  req.body.is_active = req.body.is_active ?? 1;

  // optional fields
  req.body.phone = req.body.phone || null;
  req.body.address = req.body.address || null;

  const result = await addUser(req.body);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('Could not add user');
    error.status = 404;
    return next(error);
  }
  res.status(201).json({message: 'New user added', result});
};

const putUser = async (req, res, next) => {
  const user = await findUserById(req.params.id);
  const loggedInUser = res.locals.user;

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  // check if logged in user exists
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // allow admin to modify anyone, or user to modify self
  if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== user.user_id) {
    const error = new Error('User cannot modify this user');
    error.status = 403;
    return next(error);
  }

  const newData = {...req.body};

  if ('phone' in newData && !newData.phone) {
    newData.phone = null;
  }
  if ('address' in newData && !newData.address) {
    newData.address = null;
  }

  // modify password to hash format before it is added to the database
  if (req.body.password) {
    newData.password_hash = await hashFormatPassword(req.body.password);
    delete newData.password;
  }

  const fieldsToUpdate = Object.fromEntries(
    Object.entries(newData).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(fieldsToUpdate).length === 0) {
    const error = new Error('No fields to update');
    error.status = 400;
    return next(error);
  }

  const result = await modifyUser(newData, user.user_id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('No updates done');
    error.status = 404;
    return next(error);
  }

  const updatedUser = await findUserById(user.user_id);
  // create new jwt with updated info
  const updatedTokenUser = {
    user_id: updatedUser.user_id,
    username: updatedUser.username,
    email: updatedUser.email,
    phone: result.phone,
    address: result.address,
    role: result.role,
    is_active: result.is_active,
  };

  const newToken = jwt.sign(updatedTokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({message: 'User updated', result, token: newToken});
};

const deleteUser = async (req, res, next) => {
  const user = await findUserById(req.params.id);
  const loggedInUser = res.locals.user;

  // check if user exists
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }

  // check if logged in user exists (from token)
  if (!loggedInUser) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  // check if user is deleting themselves or is admin
  if (user.user_id !== loggedInUser.user_id && loggedInUser.role !== 'admin') {
    const error = new Error('User cannot delete this user');
    error.status = 403;
    return next(error);
  }

  const result = await removeUser(user.user_id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('User not deleted');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'User deleted', result});
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
