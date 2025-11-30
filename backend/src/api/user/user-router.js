import express from 'express';
import {getUserById, postUser, putUser, deleteUser} from './user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

// requests to /api/v1/user
userRouter.route('/').post(
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
  validationErrors,
  postUser
);

// requests to /api/v1/user/:id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
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
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
