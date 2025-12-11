/**
 * @api {get} /lunch-special/ Get all lunch specials
 * @apiName GetAllLunchSpecials
 * @apiGroup LunchSpecial
 *
 * @apiSuccess {Object[]} specials List of all active lunch specials ordered by day of week.
 * @apiSuccess {Number} specials.special_id Unique lunch special ID.
 * @apiSuccess {Number} specials.menu_item_id Menu item ID.
 * @apiSuccess {String} specials.day_of_week Day of the week (monday-friday).
 * @apiSuccess {Decimal} specials.special_price Special price for lunch.
 * @apiSuccess {Number} specials.is_active Active status (1 = active, 0 = inactive).
 * @apiSuccess {String} specials.name Menu item name in default language.
 * @apiSuccess {String} specials.name_en Menu item name in English.
 * @apiSuccess {String} specials.description Menu item description in default language.
 * @apiSuccess {String} specials.description_en Menu item description in English.
 * @apiSuccess {Decimal} specials.regular_price Regular price of the menu item.
 * @apiSuccess {String} specials.image_url Image filename.
 * @apiSuccess {String} specials.image_thumb_url Thumbnail image filename.
 * @apiSuccess {String} specials.ingredients Comma-separated list of ingredients.
 * @apiSuccess {Number} specials.spice_level Spice level (0 = none, 1 = mild, 2 = medium, 3 = hot).
 * @apiSuccess {String} specials.selected_protein Selected protein for the special (can be NULL).
 * @apiSuccess {Number} specials.selected_spice_level Selected spice level for the special (can be NULL).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "special_id": 1,
 *       "menu_item_id": 3,
 *       "day_of_week": "monday",
 *       "special_price": 13.90,
 *       "is_active": 1,
 *       "name": "Kanatacot x 3",
 *       "name_en": "Chicken Tacos x 3",
 *       "description": "Maissitortillat, kanan paistileikettä, kevyt chilikastike ja tuore korianteri",
 *       "description_en": "Corn tortillas with grilled chicken, light chili sauce, and fresh coriander",
 *       "regular_price": 14.50,
 *       "image_url": "file-1765383166069-43206164.jpg",
 *       "image_thumb_url": "file-1765383166069-43206164_thumb.jpg",
 *       "ingredients": "corn tortillas, chicken, chili sauce, coriander",
 *       "spice_level": 1,
 *       "selected_protein": null,
 *       "selected_spice_level": null
 *     },
 *     {
 *       "special_id": 3,
 *       "menu_item_id": 7,
 *       "day_of_week": "wednesday",
 *       "special_price": 13.90,
 *       "is_active": 1,
 *       "name": "Burrito",
 *       "name_en": "Burrito",
 *       "description": "Vehnätortilla, jossa riisiä, mustia papuja, grillattua maissia, paahdettu chilikastike sek valitsemasi proteiini. Tulisuus: mieto, medium tai hot",
 *       "description_en": "Wheat tortilla filled with rice, black beans, grilled corn, roasted chili sauce, and your choice of protein. Spice: mild, medium, or hot",
 *       "regular_price": 16.90,
 *       "image_url": "file-1765383415226-275418653.jpg",
 *       "image_thumb_url": "file-1765383415226-275418653_thumb.jpg",
 *       "ingredients": "wheat tortilla, rice, black beans, corn, chili sauce",
 *       "spice_level": 2,
 *       "selected_protein": "chicken",
 *       "selected_spice_level": 1
 *     }
 *   ]
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching lunch specials.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /lunch-special/today Get today's lunch special
 * @apiName GetTodaysLunchSpecial
 * @apiGroup LunchSpecial
 *
 * @apiSuccess {Number} special_id Unique lunch special ID.
 * @apiSuccess {Number} menu_item_id Menu item ID.
 * @apiSuccess {String} day_of_week Day of the week (monday-friday).
 * @apiSuccess {Decimal} special_price Special price for lunch.
 * @apiSuccess {Number} is_active Active status (1 = active, 0 = inactive).
 * @apiSuccess {String} name Menu item name in default language.
 * @apiSuccess {String} name_en Menu item name in English.
 * @apiSuccess {String} description Menu item description in default language.
 * @apiSuccess {String} description_en Menu item description in English.
 * @apiSuccess {Decimal} regular_price Regular price of the menu item.
 * @apiSuccess {String} image_url Image filename.
 * @apiSuccess {String} image_thumb_url Thumbnail image filename.
 * @apiSuccess {String} ingredients Comma-separated list of ingredients.
 * @apiSuccess {Number} spice_level Spice level (0 = none, 1 = mild, 2 = medium, 3 = hot).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "special_id": 2,
 *     "menu_item_id": 4,
 *     "day_of_week": "tuesday",
 *     "special_price": 13.90,
 *     "is_active": 1,
 *     "name": "Nautatacot x 3",
 *     "name_en": "Beef Tacos x 3",
 *     "description": "Maissitortillat, paahdettua naudanlihaa, vihreä salsa (salsa verde) ja sipulia",
 *     "description_en": "Corn tortillas with roasted beef, green salsa (salsa verde) and onions",
 *     "regular_price": 14.50,
 *     "image_url": "file-1765383322697-38271346.jpg",
 *     "image_thumb_url": "file-1765383322697-38271346_thumb.jpg",
 *     "ingredients": "corn tortillas, beef, salsa verde, onions",
 *     "spice_level": 1
 *   }
 *
 * @apiError (Error 4xx) NotFound No lunch special available today or it's weekend.
 * @apiErrorExample {json} Error-Response (Weekend):
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special on weekends"
 *   }
 * @apiErrorExample {json} Error-Response (No Special):
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special available today"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching today's lunch special.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /lunch-special/:day Get lunch special by day
 * @apiName GetLunchSpecialByDay
 * @apiGroup LunchSpecial
 *
 * @apiParam {String="monday","tuesday","wednesday","thursday","friday"} day Day of the week (case-insensitive).
 *
 * @apiSuccess {Number} special_id Unique lunch special ID.
 * @apiSuccess {Number} menu_item_id Menu item ID.
 * @apiSuccess {String} day_of_week Day of the week (monday-friday).
 * @apiSuccess {Decimal} special_price Special price for lunch.
 * @apiSuccess {Number} is_active Active status (1 = active, 0 = inactive).
 * @apiSuccess {String} name Menu item name in default language.
 * @apiSuccess {String} name_en Menu item name in English.
 * @apiSuccess {String} description Menu item description in default language.
 * @apiSuccess {String} description_en Menu item description in English.
 * @apiSuccess {Decimal} regular_price Regular price of the menu item.
 * @apiSuccess {String} image_url Image filename.
 * @apiSuccess {String} image_thumb_url Thumbnail image filename.
 * @apiSuccess {String} ingredients Comma-separated list of ingredients.
 * @apiSuccess {Number} spice_level Spice level (0 = none, 1 = mild, 2 = medium, 3 = hot).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "special_id": 5,
 *     "menu_item_id": 8,
 *     "day_of_week": "friday",
 *     "special_price": 13.90,
 *     "is_active": 1,
 *     "name": "Burrito bowl",
 *     "name_en": "Burrito bowl",
 *     "description": "Kulho, jossa lime-riisiä, tuoretta salaattia, mustia papuja, grillattua paprikaa, tomaattisals (pico de gallo) ja valitsemasi proteiini. Tulisuus: mieto, medium tai hot",
 *     "description_en": "Bowl with lime rice, fresh salad, black beans, grilled peppers, tomato salsa (pico de gallo) and your choice of protein. Spice: mild, medium, or hot",
 *     "regular_price": 16.90,
 *     "image_url": "file-1765383464658-569215575.jpg",
 *     "image_thumb_url": "file-1765383464658-569215575_thumb.jpg",
 *     "ingredients": "lime rice, salad, black beans, peppers, pico de gallo",
 *     "spice_level": 2
 *   }
 *
 * @apiError (Error 4xx) NotFound No lunch special found for the specified day.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No lunch special found for monday"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching lunch special.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */
