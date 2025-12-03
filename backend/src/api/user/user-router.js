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

const userRouter = express.Router();

// requests to /api/v1/user
userRouter
  .route('/')
  .get(authenticateToken, validationErrors, getUsers)
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 8}),
    body('phone')
      .trim()
      .custom(async (phone) => {
        if (!phone.startsWith('+358')) {
          throw new Error('Phone number is not finnish');
        } else {
          // trim + and change remaining string to numeric format
          const phoneNumber = phone.split('+')[1];

          if (isNaN(phoneNumber)) {
            throw new Error('Phone number must only contain digits');
          } else if (phoneNumber.length < 12) {
            throw new Error('Phone number is too short');
          }
        }
      }),
    body('role')
      .trim()
      .custom((role) => role !== 'admin'),
    body('is_active').optional().isInt({min: 0, max: 1}),
    validationErrors,
    postUser
  );

// requests to /api/v1/user/:id
userRouter
  .route('/:id')
  .get(authenticateToken, validationErrors, getUserById)
  .put(
    authenticateToken,
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('email').optional().trim().isEmail(),
    body('password').optional().trim().isLength({min: 8}),
    body('phone')
      .optional()
      .trim()
      .custom(async (phone) => {
        if (!phone.startsWith('+358')) {
          throw new Error('Phone number is not finnish');
        } else {
          // trim + and change remaining string to numeric format
          const phoneNumber = phone.split('+')[1];

          if (isNaN(phoneNumber)) {
            throw new Error('Phone number must only contain digits');
          } else if (phoneNumber.length < 12) {
            throw new Error('Phone number is too short');
          }
        }
      }),
    body('is_active').optional().isInt({min: 0, max: 1}),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, validationErrors, deleteUser);

export default userRouter;
