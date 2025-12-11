/**
 * @apiDefine AdminAuthHeader
 * @apiHeader {String} Authorization Bearer token of admin user.
 */

/**
 * @apiDefine UserAuthHeader
 * @apiHeader {String} Authorization Bearer token obtained from login.
 */

/**
 * @api {get} /user/ Get all users
 * @apiName GetUsers
 * @apiGroup User
 * @apiUse AdminAuthHeader
 *
 * @apiDescription Admin only - returns all users without password hashes.
 *
 * @apiSuccess {Object} result Wrapper object containing users array.
 * @apiSuccess {Object[]} result.result List of all users.
 * @apiSuccess {Number} result.result.user_id Unique user ID.
 * @apiSuccess {String} result.result.username Username.
 * @apiSuccess {String} result.result.email User email address.
 * @apiSuccess {String} result.result.phone User phone number (can be null).
 * @apiSuccess {String} result.result.address User address (can be null).
 * @apiSuccess {String} result.result.role User role (admin, user, customer).
 * @apiSuccess {Number} result.result.is_active Active status (1 = active, 0 = inactive).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": [
 *       {
 *         "user_id": 1,
 *         "username": "admin",
 *         "email": "admin@restaurant.fi",
 *         "phone": "+3582323423424",
 *         "address": "kakalskd",
 *         "role": "admin",
 *         "is_active": 1
 *       },
 *       {
 *         "user_id": 2,
 *         "username": "liisa",
 *         "email": "liisa@example.fi",
 *         "phone": "+358112233445",
 *         "address": null,
 *         "role": "customer",
 *         "is_active": 1
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User is not admin.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot access this resource"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching users.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {get} /user/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can view their own profile. Admins can view any user profile. Password hash is never returned.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {Object} result Wrapper object containing user.
 * @apiSuccess {Number} result.result.user_id Unique user ID.
 * @apiSuccess {String} result.result.username Username.
 * @apiSuccess {String} result.result.email User email address.
 * @apiSuccess {String} result.result.phone User phone number (can be null).
 * @apiSuccess {String} result.result.address User address (can be null).
 * @apiSuccess {String} result.result.role User role (admin, user, customer).
 * @apiSuccess {Number} result.result.is_active Active status (1 = active, 0 = inactive).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": {
 *       "user_id": 2,
 *       "username": "liisa",
 *       "email": "liisa@example.fi",
 *       "phone": "+358112233445",
 *       "address": null,
 *       "role": "customer",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError (Error 4xx) NotFound User not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User cannot access this resource (not self or admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Could not find user"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot get this user"
 *   }
 *
 * @apiError (Error 5xx) InternalServerError Server error occurred while fetching user.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "error": "Internal server error"
 *   }
 */

/**
 * @api {post} /user/ Create new user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiDescription Public endpoint - no authentication required. Creates a new user account. Cannot create admin users through this endpoint.
 *
 * @apiBody {String{3-20}} username Username (alphanumeric, 3-20 characters, must be unique).
 * @apiBody {String} email Valid email address (must be unique).
 * @apiBody {String{8..}} password Password (minimum 8 characters, will be hashed).
 * @apiBody {String} [phone] Finnish phone number starting with +358 (minimum 9 digits).
 * @apiBody {String} [address] User address.
 * @apiBody {String="user","customer"} [role] User role (default: "customer", cannot be "admin").
 * @apiBody {Number=0,1} [is_active] Account active status (default: 1).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created user object (only user_id returned).
 * @apiSuccess {Number} result.user_id Unique user ID of created user.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New user added",
 *     "result": {
 *       "user_id": 5
 *     }
 *   }
 *
 * @apiError (Error 4xx) Conflict Username or email already exists.
 * @apiError (Error 4xx) BadRequest Invalid input data (validation failed).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 409 Conflict
 *   {
 *     "error": "Username already exists"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 409 Conflict
 *   {
 *     "error": "Email already exists"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Username must be between 3 and 20 characters long"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "User with admin role cannot be created"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Could not add user"
 *   }
 */

/**
 * @api {put} /user/:id Update user
 * @apiName PutUser
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can update their own profile. Admins can update any user. Returns updated user object and new JWT token.
 *
 * @apiParam {Number} id User unique ID.
 * @apiBody {String{3-20}} [username] Username (alphanumeric, 3-20 characters, must be unique).
 * @apiBody {String} [email] Valid email address (must be unique).
 * @apiBody {String{8..}} [password] Password (minimum 8 characters, will be hashed).
 * @apiBody {String} [phone] Finnish phone number starting with +358 (minimum 9 digits, null to remove).
 * @apiBody {String} [address] User address (null to remove).
 * @apiBody {String="user","customer","admin"} [role] User role.
 * @apiBody {Number=0,1} [is_active] Account active status.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated user object without password hash.
 * @apiSuccess {Number} result.user_id Unique user ID.
 * @apiSuccess {String} result.username Username.
 * @apiSuccess {String} result.email User email address.
 * @apiSuccess {String} result.phone User phone number (can be null).
 * @apiSuccess {String} result.address User address (can be null).
 * @apiSuccess {String} result.role User role.
 * @apiSuccess {Number} result.is_active Active status (1 = active, 0 = inactive).
 * @apiSuccess {String} token New JWT token with updated user information.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User updated",
 *     "result": {
 *       "user_id": 2,
 *       "username": "updated_liisa",
 *       "email": "updated@example.fi",
 *       "phone": "+358999999999",
 *       "address": "Updated Address 123",
 *       "role": "customer",
 *       "is_active": 1
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 *
 * @apiError (Error 4xx) NotFound User not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User cannot modify this user (not self or admin).
 * @apiError (Error 4xx) Conflict Username or email already exists.
 * @apiError (Error 4xx) BadRequest No fields to update.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "User not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot modify this user"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 409 Conflict
 *   {
 *     "error": "Username already exists"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "No fields to update"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "No updates done"
 *   }
 */

/**
 * @api {delete} /user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiDescription Users can delete their own account. Admins can delete any user. Uses database transaction for safety.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} result Result message.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User deleted",
 *     "result": "User deleted"
 *   }
 *
 * @apiError (Error 4xx) NotFound User not found.
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiError (Error 4xx) Forbidden User cannot delete this user (not self or admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "User not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot delete this user"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "User not deleted"
 *   }
 */
