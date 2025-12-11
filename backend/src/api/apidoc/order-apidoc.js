/**
 * @apiDefine AdminAuthHeader
 * @apiHeader {String} Authorization Bearer token of admin user.
 */

/**
 * @apiDefine UserAuthHeader
 * @apiHeader {String} Authorization Bearer token obtained from login.
 */

/**
 * @api {post} /order/ Create new order
 * @apiName PostOrder
 * @apiGroup Order
 *
 * @apiDescription Public endpoint - no authentication required. If user is logged in, their user_id will be automatically attached to the order.
 *
 * @apiBody {String{3-20}} customer_name Customer's full name (3-20 characters).
 * @apiBody {String} customer_email Valid email address.
 * @apiBody {String} customer_phone Finnish phone number starting with +358 (min 12 digits).
 * @apiBody {String="pickup","delivery"} order_type Type of order.
 * @apiBody {String} [delivery_address] Required if order_type is "delivery".
 * @apiBody {Object[]} items Array of order items (minimum 1 item required).
 * @apiBody {Number} items.menu_item_id Menu item ID (integer, min 1).
 * @apiBody {String} items.item_name Name of the menu item.
 * @apiBody {Number} items.quantity Quantity ordered (integer, min 1).
 * @apiBody {Decimal} items.unit_price Price per unit (decimal format).
 * @apiBody {Number} [items.selected_spice_level] Optional spice level selection.
 * @apiBody {String} [items.selected_protein] Optional protein selection.
 * @apiBody {String} [items.special_requests] Optional special requests.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created order object with full details including items array.
 * @apiSuccess {Number} result.order_id Unique order ID.
 * @apiSuccess {Number} result.user_id User ID (null for guest orders).
 * @apiSuccess {String} result.customer_name Customer name.
 * @apiSuccess {String} result.customer_email Customer email.
 * @apiSuccess {String} result.customer_phone Customer phone.
 * @apiSuccess {String} result.order_type Order type (pickup/delivery).
 * @apiSuccess {String} result.delivery_address Delivery address (null for pickup).
 * @apiSuccess {String} result.order_status Order status (default: "pending").
 * @apiSuccess {Decimal} result.total_price Total price calculated from items.
 * @apiSuccess {DateTime} result.created_at Order creation timestamp.
 * @apiSuccess {Object[]} result.items Array of order items.
 *
 * @apiSuccessExample {json} Success-Response (Logged in user):
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New order created",
 *     "result": {
 *       "order_id": 1,
 *       "user_id": 2,
 *       "customer_name": "Liisa Virtanen",
 *       "customer_email": "liisa@example.fi",
 *       "customer_phone": "+358112233445",
 *       "order_type": "pickup",
 *       "delivery_address": null,
 *       "order_status": "pending",
 *       "total_price": 31.40,
 *       "created_at": "2025-12-11T16:42:10.000Z",
 *       "items": [
 *         {
 *           "order_item_id": 1,
 *           "order_id": 1,
 *           "menu_item_id": 7,
 *           "item_name": "Burrito",
 *           "selected_protein": "beef",
 *           "selected_spice_level": 3,
 *           "quantity": 1,
 *           "unit_price": 16.90,
 *           "special_requests": "No onions"
 *         },
 *         {
 *           "order_item_id": 2,
 *           "order_id": 1,
 *           "menu_item_id": 1,
 *           "item_name": "Maissilastut",
 *           "selected_protein": null,
 *           "selected_spice_level": null,
 *           "quantity": 1,
 *           "unit_price": 7.90,
 *           "special_requests": null
 *         }
 *       ]
 *     }
 *   }
 *
 * @apiSuccessExample {json} Success-Response (Guest order):
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New order created",
 *     "result": {
 *       "order_id": 4,
 *       "user_id": null,
 *       "customer_name": "Guest customer",
 *       "customer_email": "guest@example.com",
 *       "customer_phone": "+358123456789",
 *       "order_type": "pickup",
 *       "delivery_address": null,
 *       "order_status": "pending",
 *       "total_price": 15.80,
 *       "created_at": "2025-12-11T18:33:25.000Z",
 *       "items": [
 *         {
 *           "order_item_id": 7,
 *           "order_id": 4,
 *           "menu_item_id": 1,
 *           "item_name": "Maissilastut",
 *           "selected_protein": null,
 *           "selected_spice_level": null,
 *           "quantity": 2,
 *           "unit_price": 7.90,
 *           "special_requests": null
 *         }
 *       ]
 *     }
 *   }
 *
 * @apiError (Error 4xx) BadRequest Invalid input data or validation failed.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Customer name is required"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Delivery address is required for delivery orders"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Could not create order"
 *   }
 */

/**
 * @api {get} /order/ Get all orders
 * @apiName GetAllOrders
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - returns all orders in the system ordered by creation date (newest first).
 *
 * @apiSuccess {Object[]} orders List of all orders.
 * @apiSuccess {Number} orders.order_id Unique order ID.
 * @apiSuccess {Number} orders.user_id User ID (null for guest orders).
 * @apiSuccess {String} orders.order_status Order status (pending, completed, cancelled).
 * @apiSuccess {Decimal} orders.total_price Total price.
 * @apiSuccess {String} orders.customer_name Customer name.
 * @apiSuccess {String} orders.customer_email Customer email.
 * @apiSuccess {String} orders.customer_phone Customer phone.
 * @apiSuccess {String} orders.delivery_address Delivery address (null for pickup).
 * @apiSuccess {String} orders.order_type Order type (pickup/delivery).
 * @apiSuccess {DateTime} orders.created_at Order creation timestamp.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order_id": 9,
 *       "user_id": 2,
 *       "order_status": "pending",
 *       "total_price": 13.90,
 *       "customer_name": "liisa",
 *       "customer_email": "liisaa@example.fi",
 *       "customer_phone": "+358123452",
 *       "delivery_address": "kalakatu",
 *       "order_type": "delivery",
 *       "created_at": "2025-12-11T19:10:21.000Z"
 *     },
 *     {
 *       "order_id": 2,
 *       "user_id": null,
 *       "order_status": "pending",
 *       "total_price": 21.80,
 *       "customer_name": "Juhani Korhonen",
 *       "customer_email": "juhani@example.fi",
 *       "customer_phone": "+358223344556",
 *       "delivery_address": "Myllypurontie 1 , Helsinki",
 *       "order_type": "delivery",
 *       "created_at": "2025-12-11T16:42:10.000Z"
 *     }
 *   ]
 *
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "message": "Authentication required"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "Admin access required"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching orders.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /order/user/:userId Get user's orders
 * @apiName GetUsersOrders
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can only view their own orders. Admins can view any user's orders. Returns orders with items array included.
 *
 * @apiParam {Number} userId User unique ID.
 *
 * @apiSuccess {Object[]} orders List of user's orders with items.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order_id": 1,
 *       "user_id": 2,
 *       "order_status": "completed",
 *       "total_price": 31.40,
 *       "customer_name": "Liisa Virtanen",
 *       "customer_email": "liisa@example.fi",
 *       "customer_phone": "+358112233445",
 *       "delivery_address": null,
 *       "order_type": "pickup",
 *       "created_at": "2025-12-11T16:42:10.000Z",
 *       "items": [
 *         {
 *           "order_item_id": 1,
 *           "order_id": 1,
 *           "menu_item_id": 7,
 *           "item_name": "Burrito",
 *           "selected_protein": "beef",
 *           "selected_spice_level": 3,
 *           "quantity": 1,
 *           "unit_price": 16.90,
 *           "special_requests": "No onions"
 *         }
 *       ]
 *     }
 *   ]
 *
 * @apiError (Error 4xx) NotFound No orders found for this user.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User can only view their own orders (unless admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Orders not found for this user"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "You can only view your own orders"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching user orders.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /order/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can only view their own orders. Admins can view any order. Returns order without items array (use /order/:id/details for items).
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {Number} order_id Unique order ID.
 * @apiSuccess {Number} user_id User ID (null for guest orders).
 * @apiSuccess {String} order_status Order status (pending, completed, cancelled).
 * @apiSuccess {Decimal} total_price Total price.
 * @apiSuccess {String} customer_name Customer name.
 * @apiSuccess {String} customer_email Customer email.
 * @apiSuccess {String} customer_phone Customer phone.
 * @apiSuccess {String} delivery_address Delivery address (null for pickup).
 * @apiSuccess {String} order_type Order type (pickup/delivery).
 * @apiSuccess {DateTime} created_at Order creation timestamp.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "order_id": 1,
 *     "user_id": 2,
 *     "order_status": "completed",
 *     "total_price": 31.40,
 *     "customer_name": "Liisa Virtanen",
 *     "customer_email": "liisa@example.fi",
 *     "customer_phone": "+358112233445",
 *     "delivery_address": null,
 *     "order_type": "pickup",
 *     "created_at": "2025-12-11T16:42:10.000Z"
 *   }
 *
 * @apiError (Error 4xx) NotFound Order not found.
 * @apiError (Error 4xx) Unauthorized Authentication required to view orders.
 * @apiError (Error 4xx) Forbidden User can only view their own orders (unless admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "message": "Order not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "message": "Authentication required to view orders"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "You can only view your own orders"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching order.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "message": "Error checking authorization"
 *   }
 */

/**
 * @api {get} /order/:id/details Get order details with items
 * @apiName GetOrderDetails
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can only view their own orders. Admins can view any order. Returns complete order with items array.
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {Number} order_id Unique order ID.
 * @apiSuccess {Number} user_id User ID (null for guest orders).
 * @apiSuccess {String} order_status Order status (pending, completed, cancelled).
 * @apiSuccess {Decimal} total_price Total price.
 * @apiSuccess {String} customer_name Customer name.
 * @apiSuccess {String} customer_email Customer email.
 * @apiSuccess {String} customer_phone Customer phone.
 * @apiSuccess {String} delivery_address Delivery address (null for pickup).
 * @apiSuccess {String} order_type Order type (pickup/delivery).
 * @apiSuccess {DateTime} created_at Order creation timestamp.
 * @apiSuccess {Object[]} items Array of order items.
 * @apiSuccess {Number} items.order_item_id Unique order item ID.
 * @apiSuccess {Number} items.order_id Order ID.
 * @apiSuccess {Number} items.menu_item_id Menu item ID.
 * @apiSuccess {String} items.item_name Menu item name.
 * @apiSuccess {String} items.selected_protein Selected protein (can be null).
 * @apiSuccess {Number} items.selected_spice_level Selected spice level (can be null).
 * @apiSuccess {Number} items.quantity Quantity ordered.
 * @apiSuccess {Decimal} items.unit_price Price per unit.
 * @apiSuccess {String} items.special_requests Special requests (can be null).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "order_id": 2,
 *     "user_id": null,
 *     "order_status": "pending",
 *     "total_price": 21.80,
 *     "customer_name": "Juhani Korhonen",
 *     "customer_email": "juhani@example.fi",
 *     "customer_phone": "+358223344556",
 *     "delivery_address": "Myllypurontie 1 , Helsinki",
 *     "order_type": "delivery",
 *     "created_at": "2025-12-11T16:42:10.000Z",
 *     "items": [
 *       {
 *         "order_item_id": 4,
 *         "order_id": 2,
 *         "menu_item_id": 8,
 *         "item_name": "Burrito bowl",
 *         "selected_protein": "vegan",
 *         "selected_spice_level": 2,
 *         "quantity": 1,
 *         "unit_price": 16.90,
 *         "special_requests": null
 *       },
 *       {
 *         "order_item_id": 5,
 *         "order_id": 2,
 *         "menu_item_id": 13,
 *         "item_name": "Agua De Jamaica",
 *         "selected_protein": null,
 *         "selected_spice_level": null,
 *         "quantity": 1,
 *         "unit_price": 3.90,
 *         "special_requests": "Extra ice"
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 4xx) NotFound Order not found.
 * @apiError (Error 4xx) Unauthorized Authentication required to view orders.
 * @apiError (Error 4xx) Forbidden User can only view their own orders (unless admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "message": "Order not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "You can only view your own orders"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching order details.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "message": "Error checking authorization"
 *   }
 */

/**
 * @api {put} /order/:id Update order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - update order information. Cannot update order items, only order metadata.
 *
 * @apiParam {Number} id Order unique ID.
 * @apiBody {String{2-128}} [customer_name] Customer's full name (2-128 characters).
 * @apiBody {String} [customer_email] Valid email address.
 * @apiBody {String} [customer_phone] Finnish phone number starting with +358 (min 12 digits).
 * @apiBody {String="pickup","delivery"} [order_type] Type of order.
 * @apiBody {String} [delivery_address] Delivery address.
 * @apiBody {String="pending","completed","cancelled"} [order_status] Order status.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated order object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Order updated",
 *     "result": {
 *       "order_id": 5,
 *       "user_id": 2,
 *       "order_status": "completed",
 *       "total_price": 22.30,
 *       "customer_name": "Updated customer name",
 *       "customer_email": "liisa@example.com",
 *       "customer_phone": "+358999999999",
 *       "delivery_address": "Myllypurontie 1, Helsinki",
 *       "order_type": "pickup",
 *       "created_at": "2025-12-11T18:33:25.000Z"
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound Order not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiError (Error 4xx) BadRequest Invalid input data or validation failed.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Order not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "Admin access required"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Could not update order"
 *   }
 */

/**
 * @api {delete} /order/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - permanently delete an order and all its items.
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Result object with success message.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Order deleted successfully",
 *     "result": {
 *       "message": "Order deleted successfully"
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound Order not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Order not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "message": "Admin access required"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Order could not be deleted"
 *   }
 */
