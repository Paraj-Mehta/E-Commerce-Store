# API Documentation

This document provides an overview of the REST APIs used in the E-Commerce Store application.

The backend follows a modular REST architecture where each resource is managed through its own set of endpoints. Authentication and authorization are handled using JSON Web Tokens (JWT).

---

# Base URL

```
Production
https://e-commerce-store-five-blush.vercel.app/
```

---

# Authentication

The application uses **JWT (JSON Web Token)** based authentication.

After a successful login, the server generates an access token that is stored in the browser's Local Storage.

Protected API requests must include the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

The access token remains valid for **1 hour**.

---

# API Modules

The backend is organized into the following modules.

| Module | Purpose |
|---------|---------|
| Authentication | User registration and login |
| Products | Product management and retrieval |
| Categories | Category management |
| Shopping Cart | Cart operations |
| Orders | Order creation and retrieval |
| Contact | Contact form email service |

---

# Authentication API

Responsible for user authentication and authorization.

### Functionality

- Register new users
- Authenticate existing users
- Generate JWT access token
- Protect private routes

### Access

Public

---

# Product API

Handles product-related operations.

### Functionality

- Retrieve all products
- Retrieve individual product details
- Add new products
- Update existing products
- Delete products

### Access

| Operation | Access |
|-----------|--------|
| View Products | Public |
| Product Management | Admin Only |

---

# Category API

Manages product categories.

### Functionality

- Retrieve categories
- Create category
- Update category
- Delete category

### Access

| Operation | Access |
|-----------|--------|
| View Categories | Public |
| Category Management | Admin Only |

---

# Shopping Cart API

Manages products selected by authenticated users.

### Functionality

- Add products to cart
- Update product quantity
- Remove products from cart
- Retrieve user's cart

### Access

Authenticated User

### Notes

Shopping cart data is stored in MongoDB, allowing the cart to persist across user sessions.

---

# Order API

Handles order creation after successful payment.

### Functionality

- Create new order
- Retrieve user's orders

### Order Workflow

```
Shopping Cart

↓

Checkout

↓

Simulated Net Banking

↓

Payment Success

↓

Order Creation
```

### Access

Authenticated User

---

# Contact API

Handles messages submitted through the contact page.

### Functionality

- Send email through contact form

### Notes

Messages are **not stored** in the database.

---

# Authentication & Authorization

The application supports two user roles.

| Role | Permissions |
|------|-------------|
| User | Browse products, manage cart, place orders |
| Admin | Manage products and categories |

Administrative endpoints are protected using role-based authorization middleware.

---

# Error Handling

The API returns appropriate HTTP status codes based on the request outcome.

Common responses include:

| Status Code | Description |
|------------|-------------|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Invalid request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 500 | Internal server error |

---

# Security

The API incorporates several security practices.

- JWT Authentication
- Password hashing using bcrypt
- Protected routes
- Role-based authorization
- Bearer token authentication

---

# Future API Enhancements

The API has been designed to support additional functionality in future releases, including:

- Product Reviews
- Product Search
- Admin Analytics
- Product Recommendations
- Order Management
- User Management

---