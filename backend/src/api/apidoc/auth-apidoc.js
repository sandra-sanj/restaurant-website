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
 * @apiSuccess {String} token JWT token for authenticated requests.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "user": {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "phone": "+35812345678",
 *       "role": "admin",
 *       "is_active": 1
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 *
 * @apiError Unauthorized Username does not exist or password is incorrect.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user with username"
 *   }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "Password is incorrect"
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
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "token ok",
 *     "user": {
 *       "user_id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "phone": "+35812345678",
 *       "role": "admin",
 *       "is_active": 1
 *     }
 *   }
 *
 * @apiError Unauthorized Missing or invalid token.
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "error": "No user login token found"
 *   }
 */
