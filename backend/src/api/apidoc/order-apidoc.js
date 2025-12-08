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
 * @apiBody {String{2-128}} customer_name Customer's full name.
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
 * @apiBody {Number} [user_id] Automatically set if user is logged in.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created order object with full details.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New order created",
 *     "result": {
 *       "order_id": 42,
 *       "user_id": 5,
 *       "customer_name": "John Doe",
 *       "customer_email": "john@example.com",
 *       "customer_phone": "+358401234567",
 *       "order_type": "delivery",
 *       "delivery_address": "Street 123, Helsinki",
 *       "order_status": "pending",
 *       "total_price": 25.50,
 *       "created_at": "2024-12-08T10:30:00Z",
 *       "items": [
 *         {
 *           "menu_item_id": 5,
 *           "item_name": "Pad Thai",
 *           "quantity": 2,
 *           "unit_price": 12.50,
 *           "selected_spice_level": 2,
 *           "selected_protein": "chicken"
 *         }
 *       ]
 *     }
 *   }
 *
 * @apiError BadRequest Invalid input data or validation failed.
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
 */

/**
 * @api {get} /order/ Get all orders
 * @apiName GetAllOrders
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiSuccess {Object[]} orders List of all orders.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order_id": 42,
 *       "user_id": 5,
 *       "customer_name": "John Doe",
 *       "customer_email": "john@example.com",
 *       "customer_phone": "+358401234567",
 *       "order_type": "delivery",
 *       "delivery_address": "Street 123, Helsinki",
 *       "order_status": "pending",
 *       "total_price": 25.50,
 *       "created_at": "2024-12-08T10:30:00Z"
 *     }
 *   ]
 *
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
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
 */

/**
 * @api {get} /order/user/:userId Get user's orders
 * @apiName GetUsersOrders
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} userId User unique ID.
 *
 * @apiSuccess {Object[]} orders List of user's orders.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order_id": 42,
 *       "user_id": 5,
 *       "customer_name": "John Doe",
 *       "customer_email": "john@example.com",
 *       "customer_phone": "+358401234567",
 *       "order_type": "delivery",
 *       "delivery_address": "Street 123, Helsinki",
 *       "order_status": "completed",
 *       "total_price": 25.50,
 *       "created_at": "2024-12-08T10:30:00Z"
 *     }
 *   ]
 *
 * @apiError NotFound No orders found for this user.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User can only view their own orders (unless admin).
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
 */

/**
 * @api {get} /order/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {Object} order Order object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "order_id": 42,
 *     "user_id": 5,
 *     "customer_name": "John Doe",
 *     "customer_email": "john@example.com",
 *     "customer_phone": "+358401234567",
 *     "order_type": "delivery",
 *     "delivery_address": "Street 123, Helsinki",
 *     "order_status": "pending",
 *     "total_price": 25.50,
 *     "created_at": "2024-12-08T10:30:00Z"
 *   }
 *
 * @apiError NotFound Order not found.
 * @apiError Unauthorized Authentication required to view orders.
 * @apiError Forbidden User can only view their own orders (unless admin).
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
 */

/**
 * @api {get} /order/:id/details Get order details with items
 * @apiName GetOrderDetails
 * @apiGroup Order
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {Object} order Complete order object with items array.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "order_id": 42,
 *     "user_id": 5,
 *     "customer_name": "John Doe",
 *     "customer_email": "john@example.com",
 *     "customer_phone": "+358401234567",
 *     "order_type": "delivery",
 *     "delivery_address": "Street 123, Helsinki",
 *     "order_status": "pending",
 *     "total_price": 25.50,
 *     "created_at": "2024-12-08T10:30:00Z",
 *     "items": [
 *       {
 *         "order_item_id": 100,
 *         "menu_item_id": 5,
 *         "item_name": "Pad Thai",
 *         "quantity": 2,
 *         "unit_price": 12.50,
 *         "selected_spice_level": 2,
 *         "selected_protein": "chicken",
 *         "special_requests": "Extra peanuts"
 *       }
 *     ]
 *   }
 *
 * @apiError NotFound Order not found.
 * @apiError Unauthorized Authentication required to view orders.
 * @apiError Forbidden User can only view their own orders (unless admin).
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
 */

/**
 * @api {put} /order/:id Update order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiParam {Number} id Order unique ID.
 * @apiBody {String{2-128}} [customer_name] Customer's full name.
 * @apiBody {String} [customer_email] Valid email address.
 * @apiBody {String} [customer_phone] Finnish phone number starting with +358 (min 12 digits).
 * @apiBody {String="pickup","delivery"} [order_type] Type of order.
 * @apiBody {String} [delivery_address] Delivery address.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated order object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Order updated",
 *     "result": {
 *       "order_id": 42,
 *       "user_id": 5,
 *       "customer_name": "John Doe Updated",
 *       "customer_email": "john.new@example.com",
 *       "customer_phone": "+358401234567",
 *       "order_type": "pickup",
 *       "delivery_address": null,
 *       "order_status": "completed",
 *       "total_price": 25.50,
 *       "created_at": "2024-12-08T10:30:00Z"
 *     }
 *   }
 *
 * @apiError NotFound Order not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
 * @apiError BadRequest Invalid input data or validation failed.
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
 */

/**
 * @api {delete} /order/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiUse AdminAuthHeader
 *
 * @apiParam {Number} id Order unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Deleted order object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "Order deleted successfully",
 *     "result": {
 *       "order_id": 42,
 *       "user_id": 5,
 *       "customer_name": "John Doe",
 *       "customer_email": "john@example.com",
 *       "customer_phone": "+358401234567",
 *       "order_type": "delivery",
 *       "delivery_address": "Street 123, Helsinki",
 *       "order_status": "cancelled",
 *       "total_price": 25.50,
 *       "created_at": "2024-12-08T10:30:00Z"
 *     }
 *   }
 *
 * @apiError NotFound Order not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
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
 */
