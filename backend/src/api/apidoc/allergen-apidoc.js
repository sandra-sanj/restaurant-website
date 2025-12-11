/**
 * @api {get} /allergen/ Get all allergens
 * @apiName GetAllAllergens
 * @apiGroup Allergen
 *
 * @apiSuccess {Object[]} allergens List of all allergens ordered by name.
 * @apiSuccess {Number} allergens.allergen_id Unique allergen ID.
 * @apiSuccess {String} allergens.name Allergen name.
 * @apiSuccess {String} allergens.code Allergen code.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "allergen_id": 1,
 *       "name": "Laktositon / Lactose-free",
 *       "code": "L"
 *     },
 *     {
 *       "allergen_id": 2,
 *       "name": "Gluteeniton / Gluten-free",
 *       "code": "G"
 *     }
 *   ]
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching allergens.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */
/**
 * @api {get} /allergen/:id Get allergen by ID
 * @apiName GetAllergenById
 * @apiGroup Allergen
 *
 * @apiParam {Number} id Allergen unique ID.
 *
 * @apiSuccess {Number} allergen_id Unique allergen ID.
 * @apiSuccess {String} name Allergen name.
 * @apiSuccess {String} code Allergen code.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "allergen_id": 1,
 *     "name": "Laktositon / Lactose-free",
 *     "code": "L"
 *   }
 *
 * @apiError (Error 4xx) NotFound Allergen not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Allergen not found"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching allergen.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */
/**
 * @api {get} /allergen/menu-item/:menuItemId Get allergens for menu item
 * @apiName GetMenuItemAllergens
 * @apiGroup Allergen
 *
 * @apiParam {Number} menuItemId Menu item unique ID.
 *
 * @apiSuccess {Object[]} allergens List of allergens for the menu item (can be empty array).
 * @apiSuccess {Number} allergens.allergen_id Unique allergen ID.
 * @apiSuccess {String} allergens.name Allergen name.
 * @apiSuccess {String} allergens.code Allergen code.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "allergen_id": 3,
 *       "name": "Maidoton / Dairy-free",
 *       "code": "M"
 *     },
 *     {
 *       "allergen_id": 4,
 *       "name": "Vegaaninen / Vegan",
 *       "code": "VEG"
 *     }
 *   ]
 *
 * @apiSuccessExample {json} Success-Response (No Allergens):
 *   HTTP/1.1 200 OK
 *   []
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching allergens for menu item.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */
