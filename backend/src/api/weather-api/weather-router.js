import express from 'express';

import {getWeatherInfo} from './weather-controller.js';

const weatherRouter = express.Router();

weatherRouter.route('/').get(getWeatherInfo);

export default weatherRouter;
