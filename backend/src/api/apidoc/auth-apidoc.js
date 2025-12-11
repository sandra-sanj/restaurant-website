/**
 * @apiDefine UserAuthHeader
 * @apiHeader {String} Authorization Bearer token obtained from login.
 */

/**
 * @api {post} /auth/login Login User
 * @apiName PostLogin
 * @apiGroup Auth
 *
 * @apiBody {String} username Username of the user.
 * @apiBody {String} password User password (plain text, will be hashed for comparison).
 *
 * @apiSuccess {Object} user User object without password.
 * @apiSuccess {Number} user.user_id Unique user ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email User email address.
 * @apiSuccess {String} user.phone User phone number.
 * @apiSuccess {String} user.address User address.
 * @apiSuccess {String} user.role User role (e.g., "admin", "user").
 * @apiSuccess {Number} user.is_active Active status (1 = active, 0 = inactive).
 * @apiSuccess {String} token JWT token for authenticated requests.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "user": {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "phone": "+35812345678",
 *       "address": "123 Main St, Helsinki",
 *       "role": "admin",
 *       "is_active": 1
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 *
 * @apiError (Error 4xx) Unauthorized Username or password incorrect.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "Username or password incorrect"
 *   }
 *
 * @apiError (Error 4xx) ValidationError Invalid request body data.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Validation failed"
 *   }
 */

/**
 * @api {get} /auth/me Get Current User
 * @apiName GetMe
 * @apiGroup Auth
 * @apiUse UserAuthHeader
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} user User object extracted from JWT token.
 * @apiSuccess {Number} user.user_id Unique user ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email User email address.
 * @apiSuccess {String} user.phone User phone number.
 * @apiSuccess {String} user.address User address.
 * @apiSuccess {String} user.role User role (e.g., "admin", "user").
 * @apiSuccess {Number} user.is_active Active status (1 = active, 0 = inactive).
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "token ok",
 *     "user": {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "phone": "+35812345678",
 *       "address": "123 Main St, Helsinki",
 *       "role": "admin",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError (Error 4xx) Unauthorized Missing or invalid token.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 */
