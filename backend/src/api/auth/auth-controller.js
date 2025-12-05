import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {getUserByUsername} from '../user/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  //console.log('postLogin', req.body);

  // TODO: combine no user and no password match return messages into one, for enhanced security: "Username or password incorrect"
  const user = await getUserByUsername(req.body.username);
  if (!user) {
    const error = new Error('No user with username');
    error.status = 401;
    return next(error);
  }

  // check if passwords match (plain text password (gets hashed here) and hashed password)
  if (!bcrypt.compareSync(req.body.password, user.password_hash)) {
    const error = new Error('Password is incorrect');
    error.status = 401;
    return next(error);
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role: user.role,
    is_active: user.is_active,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  //console.log('getMe', res.locals.user);

  if (!res.locals.user) {
    const error = new Error('No user login token found');
    error.status = 401;
    return next(error);
  }

  /* if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.status(401).json({message: 'Could not get user with token'});
  } */

  res.json({message: 'token ok', user: res.locals.user});
};

export {postLogin, getMe};
