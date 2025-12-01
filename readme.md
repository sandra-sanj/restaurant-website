# Website for Restaurant

## Install, initialize, develop and launch project

### Install

1. Clone repository by running `git clone https://github.com/sandra-sanj/restaurant-website.git` in terminal.
2. Open cloned project folder in a code editor.
3. Run `npm install` to install everything in **package.json**. Run this command whenever said file is updated.
4. Copy the contents of **.env.sample** to new **.env** file in project root and modify all rows

### Initialize

#### Database

TODO: instructions to database creation

### Development

Run `npm run dev` when developing project.

#### Test

Run `npm run test` to run all API tests. Run specific tests:

- `npm run test:api-user` to run user related tests
- `npm run test:api-menu` to run menu related tests (TODO)

TODO: orders, other tests

### Build

#### Backend

Build project with `npm run build`. Resulting build files are located in **dist** folder.

#### Frontend

TODO: instructions about frontend init, testing, building
<br/>

Initialization: run `npm install` in **restaurant-website/frontend** folder. 
<br/>

To open project in browser, run `npm run dev` in **restaurant-website/frontend**.

### Launch

TODO: instructions about adding project to server

something something about **dist** folder

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

| Endpoint    | Method | Description                    | Request Body (Example) | Response Body (Example) | Status Codes  |
| ----------- | ------ | ------------------------------ | ---------------------- | ----------------------- | ------------- |
| /users      | GET    | Retrieve all users             | -                      | -                       |               |
| /users/:id  | GET    | Retrieve user with ID          | -                      | -                       |               |
| /users      | POST   | Create new user                | -                      | -                       | 201, 404, 409 |
| /users/:id  | PUT    | Modify user with ID            | -                      | -                       |               |
| /users/:id  | DELETE | Delete user with ID            | -                      | -                       | 200, 404      |
| /auth/login | POST   | Create login token             | -                      | -                       |               |
| /auth/me    | GET    | Retrieve user from login token | -                      | -                       |               |

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

### Categories related requests

| Endpoint        | Method | Description           | Request Body (Example) | Response Body (Example) | Status Codes  |
| --------------- | ------ | --------------------- | ---------------------- | ----------------------- | ------------- |
| /categories     | GET    | Get all categories    | -                      | -                       | 200, 500      |
| /categories/:id | GET    | Get categoriess by ID | -                      | -                       | 200, 404, 500 |

### Allergens related requests

| Endpoint               | Method | Description                 | Request Body (Example) | Response Body (Example) | Status Codes  |
| ---------------------- | ------ | --------------------------- | ---------------------- | ----------------------- | ------------- |
| /allergens             | GET    | Get all allergens           | -                      | -                       | 200, 500      |
| /allergens/:id         | GET    | Get allergens by ID         | -                      | -                       | 200, 404, 500 |
| /allergens/:menuItemId | GET    | Get allergens for menu item | -                      | -                       | 200, 404, 500 |

### Lunch-specials related requests

| Endpoint     | Method | Description               | Request Body (Example) | Response Body (Example) | Status Codes  |
| ------------ | ------ | ------------------------- | ---------------------- | ----------------------- | ------------- |
| /lunch       | GET    | Get all lunch specials    | -                      | -                       | 200, 500      |
| /lunch/today | GET    | Get today's lunch special | -                      | -                       | 200, 404, 500 |
| /lunch/:day  | GET    | Get lunch special by day  | -                      | -                       | 200, 404, 500 |
