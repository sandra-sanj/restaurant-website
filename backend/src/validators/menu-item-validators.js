import {body} from 'express-validator';

export const createCategoryIdChain = () =>
  body('category_id')
    .trim()
    .notEmpty()
    .withMessage('category_id is required')
    .isInt()
    .withMessage('category_id must be an integer');

export const createNameChain = () =>
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isLength({max: 255})
    .withMessage('name max length is 255');

export const createNameEnChain = () =>
  body('name_en')
    .trim()
    .notEmpty()
    .withMessage('name_en is required')
    .isLength({max: 255})
    .withMessage('name_en max length is 255');

export const createDescriptionChain = () =>
  body('description')
    .trim()
    .notEmpty()
    .withMessage('description is required')
    .isLength({max: 255})
    .withMessage('description max length is 255');

export const createDescriptionEnChain = () =>
  body('description_en')
    .trim()
    .notEmpty()
    .withMessage('description_en is required')
    .isLength({max: 255})
    .withMessage('description_en max length is 255');

export const createPriceChain = () =>
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .isDecimal({force_decimal: true})
    .withMessage('price must be a decimal');

export const createIngredientsChain = () =>
  body('ingredients').trim().notEmpty().withMessage('ingredients are required');

export const createSpiceLevelChain = () =>
  body('spice_level')
    .trim()
    .notEmpty()
    .withMessage('spice_level is required')
    .isInt({min: 0})
    .withMessage('spice_level must be an integer');

export const createAllowsSpiceCustomChain = () =>
  body('allows_spice_custom')
    .trim()
    .notEmpty()
    .withMessage('allows_spice_custom is required')
    .isInt({min: 0, max: 1})
    .withMessage('allows_spice_custom must be 0 or 1');

export const createAvailableProteinsChain = () =>
  body('available_proteins').optional().trim();

export const createDefaultProteinChain = () =>
  body('default_protein').optional().trim();

export const createIsAvailableChain = () =>
  body('is_available')
    .trim()
    .notEmpty()
    .withMessage('is_available is required')
    .isInt({min: 0, max: 1})
    .withMessage('is_available must be 0 or 1');
