# 🌮 Taqueria 21 -Mexican Restaurant-Web Application

A full-stack web application for a Mexican restaurant featuring online ordering, menu-management, admin dashboards, and multilingual support (Finnish/English).

## Links

### wireframe/Mockup

- **Figma Design:** [Figma](https://www.figma.com/design/KjSxTTLHWeR2CHeM5WiuAE/Web-proju?node-id=0-1&p=f&t=62huekebQT0KNgra-0)

### Azure server

- Note Application available: **9:00 -16:00** on presentation day
- **Server link:** [https://wsk-server.francecentral.cloudapp.azure.com/](https://wsk-server.francecentral.cloudapp.azure.com/)
- **API Documentation:** [https://wsk-server.francecentral.cloudapp.azure.com/docs](https://wsk-server.francecentral.cloudapp.azure.com/docs)

## Table of Contents

1. What this Project Does
2. Why this Project is Useful
3. Application Features
4. Technologies Used
5. Install, initialize, develop and launch project
6. Instructions: How to test the application

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
- **Jest & Supertest** - Api testing

### External APIs

- **OpenWeatherMap API** - Weather data

### Validation

- **V3C Markup Validation Service** - Check HTML structure, detect syntax errors
- **Lighthouse** - Improve accessibility, search engine optimization and best-practices

## Install, initialize, develop and launch project

### Prerequisites

- Node.js
- Mysql
- Git

### Install

1. Clone repository by running `git clone https://github.com/sandra-sanj/restaurant-website.git` in terminal.
2. Open cloned project folder in a code editor.
3. Run `npm install` to install everything in **package.json**. Run this command whenever said file is updated.
4. Copy the contents of **.env.sample** to new **.env** file in project root and modify all rows to match your configuration.

### Initialize

#### Database

```sql
--Open MySQL command line

-- Run the schema.sql file
source path/backend/database/schema.sql

-- Run the create-user.sql
source path/backend/database/create-user.sql

-- (Optional) Load sample data
source path/backend/database/sample_data.sql
```

#### Configure Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=mysql.metropolia.fi
DB_USER=myusername
DB_PASSWORD=mypassword
DB_NAME=myusername

# JWT Configuration
JWT_SECRET=token
JWT_EXPIRES_IN=1d

# OpenWeatherMap API
OPENWEATHER_API_KEY=your_openweather_api_key
```

Create a `.env` file in the frontend directory

```env
VITE_API_URL="siteURL.com/api/v1"
VITE_API_UPLOADS_URL="siteURL.com/uploads/"
```

### Development

Run `npm run dev` when developing project.

#### Test

Run `npm run test` to run all API tests. Run specific tests:

- `npm run test:api-user` to run user related tests
- `npm run test:api-menu` to run menu related tests
- `npm run test:api-order` to run order related tests

### Build

#### Backend

Initialization: run `npm install` in **restaurant-website/backend** folder.

To open project in browser, run `npm run dev` in **restaurant-website/backend**.

#### Frontend

Initialization: run `npm install` in **restaurant-website/frontend** folder.

To open project in browser, run `npm run dev` in **restaurant-website/frontend**.

### Launch

#### Setup Hosting
This project used Microsoft Azure for hosting. Follow [these instructions](https://mattpe.github.io/wsk/project/cloud-deployment.html) to set it up, or use your own hosting solution. Ensure that a database is installed and configured on the server.

#### Building the Frontend
Build the frontend by running `npm run build`. Resulting build files are automatically placed to **backend's public** folder (but usually they will be located in frontend's **dist** folder, from which they need to be moved to backend).

#### Deploying to the Server
1. Clone this repository on the server and pull any updates with git pull.
2. Restart the server to apply changes with `pm2 restart mexican-restaurant`.


## Instructions: How to test the application

1. **Browse the menu** without logging in
2. **Register** a new account or use sample accounts:

### Sample Accounts

**Admin Account:**

- Username: `admin`
- Password: `password`

**Customer Account:**

- Username: `liisa`
- Password: `password`

### Testing checklist

1. **Menu Browsing & Features**

- Browse different categories (All, Mains, snacks, Desserts, Drinks)
- Check today's lunch special is highligted
- View allergen information on menu items
- Check prices are clearly displayed
- Test language switching (FI/EN button on navbar)

2. **Order Process (Customer)**

- Add 2-3 items to cart
- Add special instructions (e.g., "No onions")
- Go to cart and review items
- Select pickup method (pickup or delivery)
- Fill contact information (if not logged in)
- Select payment payment method
- Proceed to checkout
- Complete order and view confirmation

3. **Users Features**

- Create account or Login customer credentials
- View user profile
- Logout

4. **Admin Features**

- Login with admin credentials
- Go to admin panel
- Edit a menu (change price)
- View admin history

5. **Responsiveness**

- Verify layout adapts correctly
- Test on mobile view
