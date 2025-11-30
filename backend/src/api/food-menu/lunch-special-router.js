import express from 'express';
import {
  getAllLunchSpecials,
  getLunchSpecialByDay,
  getTodaysLunchSpecial,
} from './lunch-special-controller.js';

const lunchRouter = express.Router();

lunchRouter.route('/').get(getAllLunchSpecials);
lunchRouter.route('/today').get(getTodaysLunchSpecial);
lunchRouter.route('/:day').get(getLunchSpecialByDay);

export default lunchRouter;
