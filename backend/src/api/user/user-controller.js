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
  // check if username exists
  if (await getUserByUsername(req.body.username)) {
    const error = new Error('Cannot add user, username already exists');
    error.status = 409;
    return next(error);
  }

  if (await findEmail(req.body.email)) {
    const error = new Error('Cannot add user, email already exists');
    error.status = 409;
    return next(error);
  }

  // modify password to hash format before it is added to the database
  req.body.password_hash = await hashFormatPassword(req.body.password);
  delete req.body.password;

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

  // check if username is already taken by another user
  const existingUserByUsername = await getUserByUsername(req.body.username);
  if (
    existingUserByUsername &&
    existingUserByUsername.user_id !== user.user_id
  ) {
    const error = new Error('Username already exists');
    error.status = 409;
    return next(error);
  }

  const existingUserByEmail = await findEmail(req.body.email);
  if (existingUserByEmail && existingUserByEmail.user_id !== user.user_id) {
    const error = new Error('Email already exists');
    error.status = 409;
    return next(error);
  }

  // modify password to hash format before it is added to the database
  if (req.body.password) {
    req.body.password_hash = await hashFormatPassword(req.body.password);
    delete req.body.password;
  }

  const result = await modifyUser(req.body, user.user_id);

  if (result.error) {
    return next(new Error(result.error));
  } else if (!result) {
    const error = new Error('No updates done');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'User updated', result});
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
