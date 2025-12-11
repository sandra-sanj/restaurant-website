import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from './user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';
import {
  createUsernameChain,
  createEmailChain,
  createPasswordChain,
  createPhoneChain,
  createAddressChain,
  createRoleChain,
  createIsActiveChain,
} from '../../validators/user-validators.js';

const userRouter = express.Router();

// requests to /api/v1/user
userRouter
  .route('/')
  .get(authenticateToken, getUsers)
  .post(
    createUsernameChain(),
    createEmailChain(),
    createPasswordChain(),
    createPhoneChain().optional(),
    createAddressChain().optional(),
    createRoleChain(),
    createIsActiveChain(),
    validationErrors,
    postUser
  );

// requests to /api/v1/user/:id
userRouter
  .route('/:id')
  .get(authenticateToken, getUserById)
  .put(
    authenticateToken,
    createUsernameChain().optional(),
    createEmailChain().optional(),
    createPasswordChain().optional(),
    createPhoneChain().optional(),
    createAddressChain().optional(),
    createRoleChain().optional(),
    createIsActiveChain().optional(),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
