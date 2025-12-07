import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  postMenuItem,
  putMenuItem,
  deleteMenuItem,
} from './food-menu-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';
import {upload, createThumbnail} from '../../middlewares/upload.js';
import {
  createCategoryIdChain,
  createNameChain,
  createNameEnChain,
  createDescriptionChain,
  createDescriptionEnChain,
  createPriceChain,
  createIngredientsChain,
  createSpiceLevelChain,
  createAllowsSpiceCustomChain,
  createAvailableProteinsChain,
  createDefaultProteinChain,
  createIsAvailableChain,
} from '../../validators/menu-item-validators.js';

const foodMenuRouter = express.Router();

// TODO: modify post, put and delete to require authentication from user with admin role

foodMenuRouter.route('/').get(validationErrors, getMenuItems).post(
  authenticateToken,
  upload.single('file'), // file needs to be created first before validations
  createCategoryIdChain(),
  createNameChain(),
  createNameEnChain(),
  createDescriptionChain(),
  createDescriptionEnChain(),
  createPriceChain(),
  createIngredientsChain(),
  createSpiceLevelChain(),
  createAllowsSpiceCustomChain(),
  createAvailableProteinsChain(),
  createDefaultProteinChain(),
  createIsAvailableChain(),
  validationErrors,
  createThumbnail,
  postMenuItem
);

foodMenuRouter
  .route('/:id')
  .get(validationErrors, getMenuItemById)
  .put(
    authenticateToken,
    upload.single('file'), // if no file in PUT, file will be undefined
    createCategoryIdChain().optional(),
    createNameChain().optional(),
    createNameEnChain().optional(),
    createDescriptionChain().optional(),
    createDescriptionEnChain().optional(),
    createPriceChain().optional(),
    createIngredientsChain().optional(),
    createSpiceLevelChain().optional(),
    createAllowsSpiceCustomChain().optional(),
    createAvailableProteinsChain().optional(),
    createDefaultProteinChain().optional(),
    createIsAvailableChain().optional(),
    validationErrors,
    createThumbnail,
    putMenuItem
  )
  .delete(authenticateToken, validationErrors, deleteMenuItem);

export default foodMenuRouter;
