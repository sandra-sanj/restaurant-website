import express from 'express';
import {postLogin, getMe} from './auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const authRouter = express.Router();

// requests to /api/v1/auth/login
authRouter.route('/login').post(validationErrors, postLogin);

// requests to /api/v1/auth/me
authRouter.route('/me').get(authenticateToken, validationErrors, getMe);

export default authRouter;
