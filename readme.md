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

table

### Order related requests

| Endpoint             | Method | Description                    | Request Body (Example) | Response Body (Example) | Status Codes       |
| -------------------- | ------ | ------------------------------ | ---------------------- | ----------------------- | ------------------ |
| /orders              | GET    | Get all orders                 | -                      | -                       | 200, 500           |
| /orders/:id          | GET    | Get orders by ID               | -                      | -                       | 200, 404, 500      |
| /orders/:id/details  | GET    | Get order by id with all items | -                      | -                       | 200, 404, 500      |
| /orders/user/:userId | GET    | Get user order with items      | -                      | -                       | 200, 404, 500      |
| /orders              | POST   | Create new order               | -                      | -                       | 201, 400           |
| /orders/:id          | PUT    | Update order with id           | -                      | -                       | 200, 400, 404, 500 |
| /orders/:id          | DELETE | Delete order with ID           | -                      | -                       | 200, 400, 404, 500 |

### Other requests (allergens, categories, lunch specials)

table
