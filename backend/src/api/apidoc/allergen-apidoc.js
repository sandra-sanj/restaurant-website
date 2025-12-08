/**
 * @api {get} /allergen/ Get all allergens
 * @apiName GetAllAllergens
 * @apiGroup Allergen
 *
 * @apiSuccess {Object[]} allergens List of all allergens.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "allergen_id": 1,
 *       "name": "Peanuts",
 *       "name_en": "Peanuts"
 *     },
 *     {
 *       "allergen_id": 2,
 *       "name": "Dairy",
 *       "name_en": "Dairy"
 *     }
 *   ]
 */

/**
 * @api {get} /allergen/:id Get allergen by ID
 * @apiName GetAllergenById
 * @apiGroup Allergen
 *
 * @apiParam {Number} id Allergen unique ID.
 *
 * @apiSuccess {Object} allergen Allergen object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "allergen_id": 1,
 *     "name": "Peanuts",
 *     "name_en": "Peanuts"
 *   }
 *
 * @apiError NotFound Allergen not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Allergen not found"
 *   }
 */

/**
 * @api {get} /allergen/menu-item/:menuItemId Get allergens for menu item
 * @apiName GetMenuItemAllergens
 * @apiGroup Allergen
 *
 * @apiParam {Number} menuItemId Menu item unique ID.
 *
 * @apiSuccess {Object[]} allergens List of allergens for the menu item.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "allergen_id": 1,
 *       "name": "Peanuts",
 *       "name_en": "Peanuts"
 *     },
 *     {
 *       "allergen_id": 3,
 *       "name": "Gluten",
 *       "name_en": "Gluten"
 *     }
 *   ]
 *
 * @apiError NotFound No allergens found for this menu item.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No allergens found for this menu item"
 *   }
 */
