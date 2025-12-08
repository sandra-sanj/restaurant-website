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
 * @apiSuccess {Object[]} result List of all users.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": [
 *       {
 *         "user_id": 1,
 *         "username": "john_doe",
 *         "email": "john@example.com",
 *         "phone": "+35812345678",
 *         "role": "admin",
 *         "is_active": 1
 *       }
 *     ]
 *   }
 *
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User is not admin.
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
 */

/**
 * @api {get} /user/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {Object} result User object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "result": {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "phone": "+35812345678",
 *       "role": "user",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError NotFound User not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User cannot access this resource (not self or admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "Could not find user"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot get this user"
 *   }
 */

/**
 * @api {post} /user/ Create new user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiBody {String{3-20}} username Username (alphanumeric, 3-20 characters).
 * @apiBody {String} email Valid email address.
 * @apiBody {String{8..}} password Password (minimum 8 characters).
 * @apiBody {String} [phone] Finnish phone number starting with +358.
 * @apiBody {String="user","customer"} [role] User role (cannot be "admin").
 * @apiBody {Number=0,1} [is_active] Account active status (0 or 1).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Created user object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "New user added",
 *     "result": {
 *       "user_id": 5,
 *       "username": "new_user",
 *       "email": "newuser@example.com",
 *       "phone": "+35812345678",
 *       "role": "user",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError Conflict Username already exists.
 * @apiError BadRequest Invalid input data (validation failed).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 409 Conflict
 *   {
 *     "error": "Cannot add user, username already exists"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Username must be between 3 and 20 characters long"
 *   }
 */

/**
 * @api {put} /user/:id Update user
 * @apiName PutUser
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} id User unique ID.
 * @apiBody {String{3-20}} [username] Username (alphanumeric, 3-20 characters).
 * @apiBody {String} [email] Valid email address.
 * @apiBody {String{8..}} [password] Password (minimum 8 characters).
 * @apiBody {String} [phone] Finnish phone number starting with +358.
 * @apiBody {String="user","customer","admin"} [role] User role.
 * @apiBody {Number=0,1} [is_active] Account active status (0 or 1).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Updated user object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User updated",
 *     "result": {
 *       "user_id": 1,
 *       "username": "updated_user",
 *       "email": "updated@example.com",
 *       "phone": "+35812345678",
 *       "role": "user",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError NotFound User not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User cannot modify this user (not self or admin).
 * @apiError Conflict Username already exists.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "User not found"
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
 */

/**
 * @api {delete} /user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiUse UserAuthHeader
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} result Deleted user object.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User deleted",
 *     "result": {
 *       "user_id": 1,
 *       "username": "deleted_user",
 *       "email": "deleted@example.com",
 *       "phone": "+35812345678",
 *       "role": "user",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError NotFound User not found.
 * @apiError Unauthorized Missing or invalid token.
 * @apiError Forbidden User cannot delete this user (not self or admin).
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": "User not found"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "error": "User cannot delete this user"
 *   }
 */
