import express from 'express';
import {getAllCategories, getCategoryById} from './category-controller.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(getAllCategories);

categoryRouter.route('/:id').get(getCategoryById);

export default categoryRouter;
