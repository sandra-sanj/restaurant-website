/**
 * @api {get} /lunch-special/ Get all lunch specials
 * @apiName GetAllLunchSpecials
 * @apiGroup LunchSpecial
 *
 * @apiSuccess {Object[]} specials List of all lunch specials for the week.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "lunch_special_id": 1,
 *       "day_of_week": "monday",
 *       "menu_item_id": 5,
 *       "name": "Pad Thai",
 *       "name_en": "Pad Thai",
 *       "description": "Stir-fried noodles",
 *       "description_en": "Stir-fried noodles",
 *       "price": 10.50
 *     },
 *     {
 *       "lunch_special_id": 2,
 *       "day_of_week": "tuesday",
 *       "menu_item_id": 8,
 *       "name": "Green Curry",
 *       "name_en": "Green Curry",
 *       "description": "Spicy coconut curry",
 *       "description_en": "Spicy coconut curry",
 *       "price": 11.00
 *     }
 *   ]
 */

/**
 * @api {get} /lunch-special/today Get today's lunch special
 * @apiName GetTodaysLunchSpecial
 * @apiGroup LunchSpecial
 *
 * @apiSuccess {Object} special Today's lunch special.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "lunch_special_id": 1,
 *     "day_of_week": "monday",
 *     "menu_item_id": 5,
 *     "name": "Pad Thai",
 *     "name_en": "Pad Thai",
 *     "description": "Stir-fried noodles",
 *     "description_en": "Stir-fried noodles",
 *     "price": 10.50
 *   }
 *
 * @apiError NotFound No lunch special available today or it's a weekend.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special on weekends"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special available today"
 *   }
 */

/**
 * @api {get} /lunch-special/:day Get lunch special by day
 * @apiName GetLunchSpecialByDay
 * @apiGroup LunchSpecial
 *
 * @apiParam {String="monday","tuesday","wednesday","thursday","friday","saturday","sunday"} day Day of the week (case-insensitive).
 *
 * @apiSuccess {Object} special Lunch special for the specified day.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "lunch_special_id": 3,
 *     "day_of_week": "wednesday",
 *     "menu_item_id": 12,
 *     "name": "Massaman Curry",
 *     "name_en": "Massaman Curry",
 *     "description": "Rich peanut curry",
 *     "description_en": "Rich peanut curry",
 *     "price": 11.50
 *   }
 *
 * @apiError NotFound No lunch special found for the specified day.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special found for wednesday"
 *   }
 */
