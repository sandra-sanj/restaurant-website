/**
 * @apiDefine AdminAuthHeader
 * @apiHeader {String} Authorization Bearer token of admin user.
 */

/**
 * @api {get} /food-menu/ Get all menu items
 * @apiName GetMenuItems
 * @apiGroup FoodMenu
 *
 * @apiSuccess {Object[]} result List of menu items.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": [
 *       {
 *         "menu_item_id": 1,
 *         "name": "Pizza",
 *         "name_en": "Pizza",
 *         "description": "Delicious cheese pizza",
 *         "description_en": "Delicious cheese pizza",
 *         "price": 12.50,
 *         "category_id": 2,
 *         "ingredients": "cheese, tomato, dough",
 *         "spice_level": 1,
 *         "allows_spice_custom": 1,
 *         "available_proteins": "chicken, beef",
 *         "default_protein": "chicken",
 *         "is_available": 1,
 *         "image_url": "pizza.jpg",
 *         "image_thumb_url": "pizza_thumb.jpg"
 *       }
 *     ]
 *   }
 */

/**
 * @api {get} /food-menu/:id Get menu item by ID
 * @apiName GetMenuItemById
 * @apiGroup FoodMenu
 *
 * @apiParam {Number} id Menu item unique ID.
 *
 * @apiSuccess {Object} result Menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": {
 *       "menu_item_id": 1,
 *       "name": "Pizza",
 *       "name_en": "Pizza",
 *       "description": "Delicious cheese pizza",
 *       "description_en": "Delicious cheese pizza",
 *       "price": 12.50,
 *       "category_id": 2,
 *       "ingredients": "cheese, tomato, dough",
 *       "spice_level": 1,
 *       "allows_spice_custom": 1,
 *       "available_proteins": "chicken, beef",
 *       "default_protein": "chicken",
 *       "is_available": 1,
 *       "image_url": "pizza.jpg",
 *       "image_thumb_url": "pizza_thumb.jpg"
 *     }
 *   }
 *
 * @apiError NotFound Menu item not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Could not find menu item"
 *   }
 */

/**
 * @api {post} /food-menu/ Create new menu item
 * @apiName PostMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiBody {File} file Image file for the menu item (required).
 * @apiBody {Number} category_id Category ID (integer).
 * @apiBody {String{..255}} name Name in default language (max 255 characters).
 * @apiBody {String{..255}} name_en Name in English (max 255 characters).
 * @apiBody {String{..255}} description Description in default language (max 255 characters).
 * @apiBody {String{..255}} description_en Description in English (max 255 characters).
 * @apiBody {Decimal} price Price of the item (decimal format).
 * @apiBody {String} ingredients Comma-separated list of ingredients.
 * @apiBody {Number} spice_level Spice level (integer, minimum 0).
 * @apiBody {Number=0,1} allows_spice_custom Whether customers can customize spice (0 or 1).
 * @apiBody {String} [available_proteins] Optional comma-separated list of proteins.
 * @apiBody {String} [default_protein] Optional default protein choice.
 * @apiBody {Number=0,1} is_available Whether item is available (0 or 1).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New menu item added",
 *     "result": {
 *       "menu_item_id": 5,
 *       "name": "Pad Thai",
 *       "name_en": "Pad Thai",
 *       "description": "Stir-fried noodles",
 *       "description_en": "Stir-fried noodles",
 *       "price": 14.50,
 *       "category_id": 3,
 *       "ingredients": "noodles, peanuts, egg",
 *       "spice_level": 2,
 *       "allows_spice_custom": 1,
 *       "available_proteins": "chicken, shrimp",
 *       "default_protein": "chicken",
 *       "is_available": 1,
 *       "image_url": "padthai.jpg",
 *       "image_thumb_url": "padthai_thumb.jpg"
 *     }
 *   }
 *
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
 * @apiError BadRequest Invalid or missing file or validation failed.
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
 */

/**
 * @api {put} /food-menu/:id Update menu item
 * @apiName PutMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiParam {Number} id Menu item unique ID.
 * @apiBody {File} [file] Image file for the menu item (optional).
 * @apiBody {Number} [category_id] Category ID (integer).
 * @apiBody {String{..255}} [name] Name in default language (max 255 characters).
 * @apiBody {String{..255}} [name_en] Name in English (max 255 characters).
 * @apiBody {String{..255}} [description] Description in default language (max 255 characters).
 * @apiBody {String{..255}} [description_en] Description in English (max 255 characters).
 * @apiBody {Decimal} [price] Price of the item (decimal format).
 * @apiBody {String} [ingredients] Comma-separated list of ingredients.
 * @apiBody {Number} [spice_level] Spice level (integer, minimum 0).
 * @apiBody {Number=0,1} [allows_spice_custom] Whether customers can customize spice (0 or 1).
 * @apiBody {String} [available_proteins] Optional comma-separated list of proteins.
 * @apiBody {String} [default_protein] Optional default protein choice.
 * @apiBody {Number=0,1} [is_available] Whether item is available (0 or 1).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Menu item updated",
 *     "result": {
 *       "menu_item_id": 1,
 *       "name": "Updated Pizza",
 *       "name_en": "Updated Pizza",
 *       "description": "New delicious pizza",
 *       "description_en": "New delicious pizza",
 *       "price": 13.50,
 *       "category_id": 2,
 *       "ingredients": "cheese, tomato, dough, basil",
 *       "spice_level": 0,
 *       "allows_spice_custom": 0,
 *       "available_proteins": null,
 *       "default_protein": null,
 *       "is_available": 1,
 *       "image_url": "updated_pizza.jpg",
 *       "image_thumb_url": "updated_pizza_thumb.jpg"
 *     }
 *   }
 *
 * @apiError NotFound Menu item not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Menu item not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "This user cannot modify menu items"
 *   }
 */

/**
 * @api {delete} /food-menu/:id Delete menu item
 * @apiName DeleteMenuItem
 * @apiGroup FoodMenu
 * @apiUse AdminAuthHeader
 *
 * @apiParam {Number} id Menu item unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Deleted menu item object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Menu item deleted",
 *     "result": {
 *       "menu_item_id": 1,
 *       "name": "Pizza",
 *       "name_en": "Pizza",
 *       "description": "Delicious cheese pizza",
 *       "description_en": "Delicious cheese pizza",
 *       "price": 12.50,
 *       "category_id": 2,
 *       "ingredients": "cheese, tomato, dough",
 *       "spice_level": 1,
 *       "allows_spice_custom": 1,
 *       "available_proteins": "chicken, beef",
 *       "default_protein": "chicken",
 *       "is_available": 1,
 *       "image_url": "pizza.jpg",
 *       "image_thumb_url": "pizza_thumb.jpg"
 *     }
 *   }
 *
 * @apiError NotFound Menu item not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Menu item not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "This user cannot delete menu items"
 *   }
 */
