# Website for Restaurant

## REST API Documentation

### Menu related requests (+ menu item allergen?)

| Endpoint  | Method | Description                | Request Body (Example) | Response Body (Example) | Status Codes |
| --------- | ------ | -------------------------- | ---------------------- | ----------------------- | ------------ |
| /menu     | GET    | Retrieve all menu items    | -                      | -                       |              |
| /menu/:id | GET    | Retrieve menu item with ID | -                      | -                       |              |
| /menu     | POST   | Create new menu item       | -                      | -                       |              |
| /menu/:id | PUT    | Modify menu item with ID   | -                      | -                       |              |
| /menu/:id | DELETE | Delete menu item with ID   | -                      | -                       |              |

### User related requests

| Endpoint    | Method | Description                    | Request Body (Example) | Response Body (Example) | Status Codes |
| ----------- | ------ | ------------------------------ | ---------------------- | ----------------------- | ------------ |
| /users      | GET    | Retrieve all users             | -                      | -                       |              |
| /users/:id  | GET    | Retrieve user with ID          | -                      | -                       |              |
| /users      | POST   | Create new user                | -                      | -                       |              |
| /users/:id  | PUT    | Modify user with ID            | -                      | -                       |              |
| /users/:id  | DELETE | Delete user with ID            | -                      | -                       |              |
| /auth/login | POST   | Create login token             | -                      | -                       |              |
| /auth/me    | GET    | Retrieve user from login token | -                      | -                       |              |

### Order related requests

table

### Other requests (allergens, categories, lunch specials)

table
