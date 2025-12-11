/**
 * @apiDefine AdminAuthHeader
 * @apiHeader {String} Authorization Bearer token of admin user.
 */

/**
 * @api {get} /food-menu/ Get all menu items
 * @apiName GetMenuItems
 * @apiGroup FoodMenu
 *
 * @apiSuccess {Object} result Wrapper object containing menu items.
 * @apiSuccess {Object[]} result.result List of menu items.
 * @apiSuccess {Number} result.result.menu_item_id Unique menu item ID.
 * @apiSuccess {Number} result.result.category_id Category ID.
 * @apiSuccess {String} result.result.name Name in default language.
 * @apiSuccess {String} result.result.name_en Name in English.
 * @apiSuccess {String} result.result.description Description in default language (max 255 chars).
 * @apiSuccess {String} result.result.description_en Description in English (max 255 chars).
 * @apiSuccess {Decimal} result.result.price Price of the item.
 * @apiSuccess {String} result.result.ingredients Comma-separated list of ingredients.
 * @apiSuccess {Number} result.result.spice_level Spice level (0 = none, 1 = mild, 2 = medium, 3 = hot).
 * @apiSuccess {Number} result.result.allows_spice_custom Whether customers can customize spice (0 or 1).
 * @apiSuccess {String} result.result.available_proteins Comma-separated list of available proteins (can be NULL).
 * @apiSuccess {String} result.result.default_protein Default protein choice (can be NULL).
 * @apiSuccess {String} result.result.image_url Image filename.
 * @apiSuccess {String} result.result.image_thumb_url Thumbnail image filename.
 * @apiSuccess {Number} result.result.is_available Whether item is available (0 or 1).
 * @apiSuccess {DateTime} result.result.created_at Creation timestamp.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": [
 *       {
 *         "menu_item_id": 1,
 *         "category_id": 1,
 *         "name": "Maissilastut",
 *         "name_en": "Corn Chips",
 *         "description": "Rapeita maissilastuja, guacamolea sekä raikas tomaattisalsa (pico de gallo)",
 *         "description_en": "Crispy corn chips served with guacamole and fresh tomato salsa (pico de gallo)",
 *         "price": 7.90,
 *         "ingredients": "corn chips, guacamole, tomato salsa",
 *         "spice_level": 0,
 *         "allows_spice_custom": 0,
 *         "available_proteins": null,
 *         "default_protein": null,
 *         "image_url": "file-1765383134925-513448800.jpg",
 *         "image_thumb_url": "file-1765383134925-513448800_thumb.jpg",
 *         "is_available": 1,
 *         "created_at": "2025-12-11T16:42:10.000Z"
 *       },
 *       {
 *         "menu_item_id": 7,
 *         "category_id": 2,
 *         "name": "Burrito",
 *         "name_en": "Burrito",
 *         "description": "Vehnätortilla, jossa riisiä, mustia papuja, grillattua maissia, paahdettu chilikastike sek valitsemasi proteiini. Tulisuus: mieto, medium tai hot",
 *         "description_en": "Wheat tortilla filled with rice, black beans, grilled corn, roasted chili sauce, and your choice of protein. Spice: mild, medium, or hot",
 *         "price": 16.90,
 *         "ingredients": "wheat tortilla, rice, black beans, corn, chili sauce",
 *         "spice_level": 2,
 *         "allows_spice_custom": 1,
 *         "available_proteins": "chicken, beef, vegan, shrimp",
 *         "default_protein": "beef",
 *         "image_url": "file-1765383415226-275418653.jpg",
 *         "image_thumb_url": "file-1765383415226-275418653_thumb.jpg",
 *         "is_available": 1,
 *         "created_at": "2025-12-11T16:42:10.000Z"
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching menu items.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /food-menu/:id Get menu item by ID
 * @apiName GetMenuItemById
 * @apiGroup FoodMenu
 *
 * @apiParam {Number} id Menu item unique ID.
 *
 * @apiSuccess {Object} result Wrapper object containing menu item.
 * @apiSuccess {Number} result.result.menu_item_id Unique menu item ID.
 * @apiSuccess {Number} result.result.category_id Category ID.
 * @apiSuccess {String} result.result.name Name in default language.
 * @apiSuccess {String} result.result.name_en Name in English.
 * @apiSuccess {String} result.result.description Description in default language (max 255 chars).
 * @apiSuccess {String} result.result.description_en Description in English (max 255 chars).
 * @apiSuccess {Decimal} result.result.price Price of the item.
 * @apiSuccess {String} result.result.ingredients Comma-separated list of ingredients.
 * @apiSuccess {Number} result.result.spice_level Spice level (0 = none, 1 = mild, 2 = medium, 3 = hot).
 * @apiSuccess {Number} result.result.allows_spice_custom Whether customers can customize spice (0 or 1).
 * @apiSuccess {String} result.result.available_proteins Comma-separated list of available proteins (can be NULL).
 * @apiSuccess {String} result.result.default_protein Default protein choice (can be NULL).
 * @apiSuccess {String} result.result.image_url Image filename.
 * @apiSuccess {String} result.result.image_thumb_url Thumbnail image filename.
 * @apiSuccess {Number} result.result.is_available Whether item is available (0 or 1).
 * @apiSuccess {DateTime} result.result.created_at Creation timestamp.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": {
 *       "menu_item_id": 9,
 *       "category_id": 3,
 *       "name": "Churrot",
 *       "name_en": "Churros",
 *       "description": "Churroja & suklaakastiketta",
 *       "description_en": "Churros with chocolate dipping sauce",
 *       "price": 7.90,
 *       "ingredients": "churros, chocolate sauce",
 *       "spice_level": 0,
 *       "allows_spice_custom": 0,
 *       "available_proteins": null,
 *       "default_protein": null,
 *       "image_url": "file-1765383491903-79326761.jpg",
 *       "image_thumb_url": "file-1765383491903-79326761_thumb.jpg",
 *       "is_available": 1,
 *       "created_at": "2025-12-11T16:42:10.000Z"
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound Menu item not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Could not find menu item"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching menu item.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {post} /food-menu/ Create new menu item
 * @apiName PostMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - creates a new menu item with image upload and optional allergen associations.
 *
 * @apiBody {File} file Image file for the menu item (required, will generate thumbnail automatically).
 * @apiBody {Number} category_id Category ID (integer, required).
 * @apiBody {String{..255}} name Name in default language (max 255 characters, required).
 * @apiBody {String{..255}} name_en Name in English (max 255 characters, required).
 * @apiBody {String{..255}} description Description in default language (max 255 characters, required).
 * @apiBody {String{..255}} description_en Description in English (max 255 characters, required).
 * @apiBody {Decimal} price Price of the item (decimal format, required).
 * @apiBody {String} ingredients Comma-separated list of ingredients (required).
 * @apiBody {Number} spice_level Spice level (integer, minimum 0, required).
 * @apiBody {Number=0,1} allows_spice_custom Whether customers can customize spice (0 or 1, required).
 * @apiBody {String} [available_proteins] Optional comma-separated list of proteins.
 * @apiBody {String} [default_protein] Optional default protein choice.
 * @apiBody {Number=0,1} is_available Whether item is available (0 or 1, required).
 * @apiBody {String} [allergen_ids] Optional JSON string array of allergen IDs (e.g., "[1,2,3]").
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New menu item added",
 *     "result": {
 *       "menu_item_id": 14,
 *       "category_id": 2,
 *       "name": "Kanatacot x 3",
 *       "name_en": "Chicken Tacos x 3",
 *       "description": "Maissitortillat, kanan paistileikettä, kevyt chilikastike ja tuore korianteri",
 *       "description_en": "Corn tortillas with grilled chicken, light chili sauce, and fresh coriander",
 *       "price": 14.50,
 *       "ingredients": "corn tortillas, chicken, chili sauce, coriander",
 *       "spice_level": 1,
 *       "allows_spice_custom": 0,
 *       "available_proteins": null,
 *       "default_protein": null,
 *       "image_url": "file-1765383166069-43206164.jpg",
 *       "image_thumb_url": "file-1765383166069-43206164_thumb.jpg",
 *       "is_available": 1,
 *       "created_at": "2025-12-11T16:42:10.000Z"
 *     }
 *   }
 *
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiError (Error 4xx) BadRequest Invalid or missing file or validation failed.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "This user cannot post menu item"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Invalid or missing file"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "name is required"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "description max length is 255"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "price must be a decimal"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "allergen_ids must be valid JSON"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Could not add menu item"
 *   }
 */

/**
 * @api {put} /food-menu/:id Update menu item
 * @apiName PutMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - updates menu item. All fields are optional. Updating allergen_ids replaces all existing allergen associations.
 *
 * @apiParam {Number} id Menu item unique ID.
 * @apiBody {File} [file] Image file for the menu item (optional, will generate new thumbnail).
 * @apiBody {Number} [category_id] Category ID (integer).
 * @apiBody {String{..255}} [name] Name in default language (max 255 characters).
 * @apiBody {String{..255}} [name_en] Name in English (max 255 characters).
 * @apiBody {String{..255}} [description] Description in default language (max 255 characters).
 * @apiBody {String{..255}} [description_en] Description in English (max 255 characters).
 * @apiBody {Decimal} [price] Price of the item (decimal format).
 * @apiBody {String} [ingredients] Comma-separated list of ingredients.
 * @apiBody {Number} [spice_level] Spice level (integer, minimum 0).
 * @apiBody {Number=0,1} [allows_spice_custom] Whether customers can customize spice (0 or 1).
 * @apiBody {String} [available_proteins] Comma-separated list of proteins.
 * @apiBody {String} [default_protein] Default protein choice.
 * @apiBody {Number=0,1} [is_available] Whether item is available (0 or 1).
 * @apiBody {String} [allergen_ids] Optional JSON string array of allergen IDs (e.g., "[1,2,3]"), replaces all existing allergens.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Menu item updated",
 *     "result": {
 *       "menu_item_id": 7,
 *       "category_id": 2,
 *       "name": "Burrito",
 *       "name_en": "Burrito",
 *       "description": "Vehnätortilla, jossa riisiä, mustia papuja, grillattua maissia, paahdettu chilikastike sek valitsemasi proteiini. Tulisuus: mieto, medium tai hot",
 *       "description_en": "Wheat tortilla filled with rice, black beans, grilled corn, roasted chili sauce, and your choice of protein. Spice: mild, medium, or hot",
 *       "price": 17.90,
 *       "ingredients": "wheat tortilla, rice, black beans, corn, chili sauce",
 *       "spice_level": 2,
 *       "allows_spice_custom": 1,
 *       "available_proteins": "chicken, beef, vegan, shrimp",
 *       "default_protein": "beef",
 *       "image_url": "file-1765383415226-275418653.jpg",
 *       "image_thumb_url": "file-1765383415226-275418653_thumb.jpg",
 *       "is_available": 1,
 *       "created_at": "2025-12-11T16:42:10.000Z"
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound Menu item not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiError (Error 4xx) BadRequest Validation failed.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Menu item not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "This user cannot modify menu items"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "name_en max length is 255"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "allows_spice_custom must be 0 or 1"
 *   }
 * @apiErrorExample {json} Error-Response (Validation):
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "allergen_ids must be valid JSON"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No updates done"
 *   }
 */

/**
 * @api {delete} /food-menu/:id Delete menu item
 * @apiName DeleteMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - permanently deletes a menu item.
 *
 * @apiParam {Number} id Menu item unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Result object with success message.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Menu item deleted",
 *     "result": {
 *       "message": "success"
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound Menu item not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Menu item not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "This user cannot delete menu items"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Menu item not deleted"
 *   }
 */
