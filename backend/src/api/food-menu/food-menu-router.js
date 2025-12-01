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
import {upload} from '../../middlewares/upload.js';

const foodMenuRouter = express.Router();

// TODO: modify post, put and delete to require authentication from user with admin role

foodMenuRouter
  .route('/')
  .get(validationErrors, getMenuItems)
  .post(
    authenticateToken,
    //upload.single('file'), // file needs to be created first before validations
    body('category_id').trim().isInt(),
    body('name').trim().notEmpty().isLength({max: 255}),
    body('name_en').trim().notEmpty().isLength({max: 255}),
    body('description').trim().notEmpty().isLength({max: 255}),
    body('description_en').trim().notEmpty().isLength({max: 255}),
    body('price').isDecimal({force_decimal: true}),
    body('ingredients').trim().notEmpty(),
    body('spice_level').trim().isInt(),
    body('allows_spice_custom').trim().notEmpty().isInt({min: 0, max: 1}),
    body('available_proteins'), //.isAlphanumeric(),
    body('default_protein'), //.isAlphanumeric(),
    body('image_url').notEmpty(), //.isAlphanumeric(),
    body('is_available').trim().notEmpty().isInt({min: 0, max: 1}),
    validationErrors,
    postMenuItem
  );

foodMenuRouter
  .route('/:id')
  .get(validationErrors, getMenuItemById)
  .put(
    authenticateToken,
    body('category_id').trim().isInt(),
    body('name').trim().notEmpty().isLength({max: 255}),
    body('name_en').trim().notEmpty().isLength({max: 255}),
    body('description').trim().notEmpty().isLength({max: 255}),
    body('description_en').trim().notEmpty().isLength({max: 255}),
    body('price').isDecimal({force_decimal: true}),
    body('ingredients').trim().notEmpty(),
    body('spice_level').trim().isInt(),
    body('allows_spice_custom').trim().notEmpty().isInt({min: 0, max: 1}),
    body('available_proteins'), //.isAlphanumeric(),
    body('default_protein'), //.isAlphanumeric(),
    body('image_url').notEmpty(), //.isAlphanumeric(),
    body('is_available').trim().notEmpty().isInt({min: 0, max: 1}),
    validationErrors,
    putMenuItem
  )
  .delete(authenticateToken, validationErrors, deleteMenuItem);

export default foodMenuRouter;
