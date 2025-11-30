import {
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  getUserByUsername,
} from './user-model.js';
import bcrypt from 'bcrypt';

const hashFormatPassword = async (password) => {
  return await bcrypt.hash(password, 10); //bcrypt.hashSync(password, 10);
};

// check if user id and user id from token match
const getModifyingPermissions = async (user, logged_in_user) => {
  if (
    user.user_id !== logged_in_user.user_id &&
    logged_in_user.role !== 'admin'
  ) {
    return false;
  } else {
    return true;
  }
};

const verifyUserAccess = async (user, logged_in_user) => {
  // TODO: combine error messages to one for better security ("User not found or no permission to modify user")

  // check user validity
  if (!user) {
    return {ok: false, status: 404, message: 'User not found'};
  }

  // check if token (logged in user) can modify user
  if (!(await getModifyingPermissions(user, logged_in_user))) {
    return {ok: false, status: 401, message: 'User cannot modify this user'};
  }

  return {ok: true};
};

/*const getUser = async (req, res) => {
  const users = await listAllUsers();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({message: 'Could not get users'});
  }
};*/

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (user) {
    res.status(200).json({message: user});
  } else {
    res.status(404).json({message: 'Could not find user'});
  }
};

const postUser = async (req, res, next) => {
  // check if username exists
  if (await getUserByUsername(req.body.username)) {
    return res
      .status(409)
      .json({message: 'Cannot add user, username already exists'});
  }

  // modify password to hash format before it is added to the database
  req.body.password_hash = await hashFormatPassword(req.body.password);

  const userData = {
    ...req.body,
    //filename: req.file?.filename,
  };

  const result = await addUser(userData);

  if (result) {
    res.status(201).json({message: 'New user added', result});
  } else {
    res.status(404).json({message: 'Did not add user'});
  }
};

const putUser = async (req, res) => {
  const user = await findUserById(req.params.id);

  // check user and token validity
  const valid = await verifyUserAccess(user, res.locals.user);
  if (!valid.ok) {
    return res.status(valid.status).json({message: valid.message});
  }

  // check if username in use by other user
  const existingUserByUsername = await getUserByUsername(req.body.username);
  if (existingUserByUsername?.user_id !== user.user_id) {
    return res.status(403).json({message: 'Username already exists'});
  }

  // modify password to hash format before it is added to the database
  req.body.password_hash = await hashFormatPassword(req.body.password);

  const result = await modifyUser(req.body, user.user_id);

  if (result) {
    res.status(201).json({message: 'User updated', result});
  } else {
    res.status(404).json({message: 'No updates done'});
  }
};

const deleteUser = async (req, res) => {
  const user = await findUserById(req.params.id);

  // check user and token validity
  const valid = await verifyUserAccess(user, res.locals.user);
  if (!valid.ok) {
    return res.status(valid.status).json({message: valid.message});
  }

  const result = await removeUser(user.user_id);
  if (result) {
    res.status(200).json({message: result});
  } else {
    res.status(404).json({message: result});
  }
};

export {getUserById, postUser, putUser, deleteUser};
