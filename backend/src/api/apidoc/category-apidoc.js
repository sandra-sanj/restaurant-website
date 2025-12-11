/**
 * @api {get} /category/ Get all categories
 * @apiName GetAllCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object[]} categories List of all categories ordered by display order.
 * @apiSuccess {Number} categories.category_id Unique category ID.
 * @apiSuccess {String} categories.name Category name.
 * @apiSuccess {Number} categories.display_order Display order for sorting.
 * @apiSuccess {Number} categories.is_active Active status (1 = active, 0 = inactive).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "category_id": 1,
 *       "name": "Snacks",
 *       "display_order": 1,
 *       "is_active": 1
 *     },
 *     {
 *       "category_id": 2,
 *       "name": "Mains",
 *       "display_order": 2,
 *       "is_active": 1
 *     },
 *     {
 *       "category_id": 3,
 *       "name": "Desserts",
 *       "display_order": 3,
 *       "is_active": 1
 *     }
 *   ]
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching categories.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /category/:id Get category by ID
 * @apiName GetCategoryById
 * @apiGroup Category
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {Number} category_id Unique category ID.
 * @apiSuccess {String} name Category name.
 * @apiSuccess {Number} display_order Display order for sorting.
 * @apiSuccess {Number} is_active Active status (1 = active, 0 = inactive).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "category_id": 1,
 *     "name": "Snacks",
 *     "display_order": 1,
 *     "is_active": 1
 *   }
 *
 * @apiError (Error 4xx) NotFound Category not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Category not found"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching category.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */
