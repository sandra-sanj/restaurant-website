import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from './user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';
import {
  usernameValidator,
  emailValidator,
  createUsernameChain,
  createEmailChain,
  createPasswordChain,
  createPhoneChain,
  createAddressChain,
  createRoleChain,
  createIsActiveChain,
} from '../../middlewares/validators/user-validators.js';

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
    usernameValidator,
    emailValidator,
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
