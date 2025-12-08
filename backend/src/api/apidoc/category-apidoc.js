/**
 * @api {get} /category/ Get all categories
 * @apiName GetAllCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object[]} categories List of all categories.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "category_id": 1,
 *       "name": "Appetizers",
 *       "name_en": "Appetizers"
 *     },
 *     {
 *       "category_id": 2,
 *       "name": "Main Courses",
 *       "name_en": "Main Courses"
 *     },
 *     {
 *       "category_id": 3,
 *       "name": "Desserts",
 *       "name_en": "Desserts"
 *     }
 *   ]
 */

/**
 * @api {get} /category/:id Get category by ID
 * @apiName GetCategoryById
 * @apiGroup Category
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {Object} category Category object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "category_id": 1,
 *     "name": "Appetizers",
 *     "name_en": "Appetizers"
 *   }
 *
 * @apiError NotFound Category not found.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Category not found"
 *   }
 */
