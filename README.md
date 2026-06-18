# 🍕 Foodie Backend API

A complete food delivery backend REST API built with Node.js, Express, and MongoDB. Supports user authentication, restaurant and food management, category management, order placement, and role-based access control — similar to the backend powering apps like Swiggy or Zomato.

## Features

- **User Authentication** — Register/Login with JWT-based auth and bcrypt password hashing
- **Role-Based Access** — Support for `client`, `admin`, `vendor`, and `driver` user types with admin-only protected routes
- **User Management** — Profile fetch/update, password update, forgot-password reset flow, account deletion
- **Restaurant Management** — Create, fetch, and delete restaurants with geolocation (coordinates), ratings, and open/closed status
- **Food Management** — Create and fetch food items, filter by restaurant, update food details
- **Category Management** — Create, fetch, and update food categories
- **Order System** — Place orders with a cart, automatic total calculation, and order status tracking (`Preparing` → `prepared` → `on the way` → `delivered`)
- **Secure Routes** — JWT auth middleware and admin-only middleware protecting sensitive endpoints

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Token (JWT) |
| Password Hashing | bcryptjs |
| Logging | Morgan |
| Environment Config | dotenv |
| CORS | cors |

## Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authControllers.js    # Register & Login logic
│   ├── categoryController.js # Category CRUD
│   ├── foodControllers.js    # Food CRUD & Orders
│   ├── restuarentControllers.js # Restaurant CRUD
│   ├── testControllers.js    # Health check
│   └── userController.js     # User profile & password management
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   └── adminMiddleware.js     # Admin-only access check
├── models/
│   ├── userModel.js
│   ├── restuarentModel.js
│   ├── foodModels.js
│   ├── categoryModel.js
│   └── orderModel.js
├── routes/
│   ├── authRoutes.js
│   ├── userRouter.js
│   ├── restuarentRoutes.js
│   ├── foodRoutes.js
│   ├── categoryRoutes.js
│   └── testroutes.js
├── .env                       # Environment variables (not committed)
├── server.js                  # App entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Vijay-292004/foodie-backend.git
cd foodie-backend/server
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the `server` directory
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server
```bash
npm start
```

The server will run at `http://localhost:8080`

## API Endpoints

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login and receive JWT token | No |

### User Routes — `/api/v1/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/getUser` | Get logged-in user's profile | Yes |
| PUT | `/updateUser` | Update username, address, phone | Yes |
| POST | `/updatePassword` | Change password (requires old password) | Yes |
| POST | `/resetPassword` | Reset password via email + security answer | Yes |
| DELETE | `/deleteUser/:id` | Delete user account | Yes |

### Restaurant Routes — `/api/v1/restuarent`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/create` | Create a new restaurant | Yes |
| GET | `/getAll` | Get all restaurants | No |
| GET | `/get/:id` | Get restaurant by ID | No |
| DELETE | `/delete/:id` | Delete a restaurant | Yes |

### Food Routes — `/api/v1/food`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/create` | Create a new food item | Yes |
| GET | `/getAll` | Get all food items | No |
| GET | `/get/:id` | Get food item by ID | No |
| GET | `/getByRestuarent/:id` | Get all food items for a restaurant | No |
| PUT | `/update/:id` | Update a food item | Yes |
| POST | `/placeorder` | Place an order with a food cart | Yes |
| POST | `/orderStatus/:id` | Update order status | Yes (Admin only) |

### Category Routes — `/api/v1/category`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/create` | Create a new category | Yes |
| GET | `/getall` | Get all categories | No |
| PUT | `/updateCat` | Update a category | Yes |

### Test Route — `/api/v1/test`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/test-user` | Health check endpoint | No |

## Authentication

Protected routes require a JWT token in the request header:

```
Authorization: Bearer <your_token_here>
```

The token is returned on successful login and is valid for 7 days.

## Data Models

**User** — username, email, password (hashed), address, phone, userType (client/admin/vendor/driver), profile image, security answer

**Restaurant** — title, image, foods, operating time, pickup/delivery flags, open status, rating, geolocation coordinates

**Food** — title, description, price, image, tags, category, availability, linked restaurant, rating

**Category** — title, image

**Order** — food cart, payment total, buyer reference, status (Preparing/prepared/on the way/delivered)

## Author

Built by [Vijay](https://github.com/Vijay-292004) as a backend development portfolio project.

## License

This project is open source and available for learning purposes.