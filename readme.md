# 🌮 Taqueria 21 -Mexican Restaurant-Web Application

A full-stack web application for a Mexican restaurant featuring online ordering, menu-management, admin dashboards, and multilingual support (Finnish/English).

## What this Project Does

Taqueria 21 is a comprehensive restaurant management and ordering system that allows:

- **Customers** to browse the menu, view daily lunch specials, place orders (pickup or delivery), manage their profiles, check weather conditions and view the restaurant's location

- **Administrators** to manage menu items (add/edit/delete)

The application provides features like:

- Browsing menu with allergen and price information
- Making online orders (pickup/delivery)
- Admin functions for menu and order management
- User authentication and order history
- Today's lunch special highlighting
- Multilingual support (Finnish/English)
- Real-time weather data from OpenWeather API
- Responsive design for all devices

---

## Why this Project is Useful

### For Customers

- **Convenience**: Order from anywhere anytime
- **Transparency**: Clear pricing, allergen information and ingredients lists
- **Customization**: Choose protein types and spice levels
- **Language Options**: Available in Finnish and English

### For Developers

- **Learning Resource**: Full-stack application demonstrating:
  - RESTful API design
  - JWT authentication
  - Role-based access control
  - External API integration
  - Multilingual implementaion
  - Responsive design

---

## Application Features

### Customer Features

- Browse menu by category (All, Mains, Snacks, desserts, Drinks)
- View today's lunch special highlited with discounted pricing
- Clear pricing, allergen information, ingredient lists and menu description.
- Shopping cart management (add/remove/change quantity)
- Additional information input (special requests)
- Delivery method selection (pickup/delivery)
- Contact information input or auto-fill for logged-in users
- User registration and login
- Language switching (Fi/En)
- Current weather information

### Admin Features

- Add, edit, and delete menu items
- View and manage all orders
- Category management
- Image uploading for menu items
- Order history browsing

---

## Technologies Used

### Frontend

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **react-localization** - Multilingual support
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MySQL** - Database
- **JWT** -Authentication
- **bcrypt** - Password hashing
- **express-validator** - input validation
- **Multer & Sharp** - Image upload and processing

### External APIs

- **OpenWeatherMap API** - Weather data

## Install, initialize, develop and launch project

### Install

1. Clone repository by running `git clone https://github.com/sandra-sanj/restaurant-website.git` in terminal.
2. Open cloned project folder in a code editor.
3. Run `npm install` to install everything in **package.json**. Run this command whenever said file is updated.
4. Copy the contents of **.env.sample** to new **.env** file in project root and modify all rows

### Initialize

#### Database

```sql
-- Open MySQL command line
-- Run the schema.sql file
source path/backend/database/schema.sql

-- Run the create-user.sql
source path/backend/database/create-user.sql

-- (Optional) Load sample data
source path/backend/database/sample_data.sql
```

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
