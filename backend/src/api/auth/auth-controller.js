import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {getUserByUsername} from '../user/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res, next) => {
  const combinedErrorMsg = 'Username or password incorrect';

  const user = await getUserByUsername(req.body.username);
  if (!user) {
    const error = new Error(combinedErrorMsg);
    error.status = 401;
    return next(error);
  }

  // check if passwords match (plain text password (gets hashed here) and hashed password)
  if (!bcrypt.compareSync(req.body.password, user.password_hash)) {
    const error = new Error(combinedErrorMsg);
    error.status = 401;
    return next(error);
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
    is_active: user.is_active,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res, next) => {
  if (!res.locals.user) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  res.json({message: 'token ok', user: res.locals.user});
};

export {postLogin, getMe};
