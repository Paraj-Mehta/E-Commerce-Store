# Features

This document provides an overview of the features implemented in the E-Commerce Store application and the functionality available to both customers and administrators.

---

# User Features

## Authentication

The application uses **JWT (JSON Web Token)** based authentication to securely identify users.

### Available Features

- User Registration
- User Login
- Secure Password Hashing
- JWT Authentication
- Automatic Authorization using Bearer Token
- Logout

### Authentication Flow

1. User registers an account.
2. Password is securely hashed before storage.
3. User logs in using registered credentials.
4. Server generates a JWT token.
5. Token is stored in the browser's Local Storage.
6. Protected API requests include:

```
Authorization: Bearer <JWT_TOKEN>
```

The access token remains valid for **1 hour**.

---

# Product Browsing

Users can explore products available in the store.

Current functionality includes:

- Browse all products
- View individual product details
- Product image
- Product description
- Product price
- Product category

Each product currently contains a single image uploaded through Cloudinary.

---

# Categories

Products are organized into categories to simplify navigation.

Each product belongs to **one category**.

Category information includes:

- Category Name
- Category Image

---

# Shopping Cart

The application includes a persistent shopping cart that is stored in MongoDB.

Available functionality:

- Add products to cart
- Update product quantity
- Remove products from cart
- View total cart amount

Since the cart is stored in the database, users retain their cart even after logging out and logging back in.

---

# Checkout

Users can proceed to checkout directly from their shopping cart.

Checkout process:

Shopping Cart

↓

Checkout Page

↓

Simulated Net Banking

↓

Payment Success

↓

Order Created

The application currently simulates payment processing for demonstration purposes.

---

# Orders

Users can successfully place orders after completing checkout.

Current functionality:

- Create Order
- View Order History

Each order stores:

- Purchased Products
- Quantity
- Total Amount
- Payment Status
- Order Identifier

Current payment status values:

- Pending
- Paid
- Cancelled

---

# Contact Page

The application includes a contact page that allows users to send messages.

Current implementation:

- Sends email
- Does not store messages in the database

---

# Admin Features

Administrative functionality is protected through role-based authorization.

Only users with the **Admin** role can access the admin panel.

---

## Product Management

Administrators can fully manage products.

Available operations:

- Add Product
- Edit Product
- Delete Product

Each product contains:

- Product Name
- Description
- Price
- Category
- Product Image

Images are uploaded to Cloudinary before being stored in MongoDB.

---

## Category Management

Administrators can manage product categories.

Available operations:

- Add Category
- Edit Category
- Delete Category

Each category stores:

- Category Name
- Category Image

---

# Image Upload

Product and category images are uploaded using the following workflow:

1. Image selected from frontend
2. Image processed using Multer
3. Uploaded to Cloudinary
4. Cloudinary URL stored in MongoDB
5. URL returned to frontend

This approach reduces server storage requirements while providing optimized image delivery.

---

# Security Features

The application implements several security practices.

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Secure API Access using Bearer Token

---

# Current Limitations

The following functionality has not yet been implemented.

- Forgot Password
- User Profile Picture
- Product Search
- Product Sorting
- Wishlist
- Product Reviews
- Order Tracking
- Order Cancellation
- Admin Order Management
- Admin User Management
- Admin Analytics
- Product Recommendation System

---

# Future Improvements

Planned enhancements include:

- Product Reviews
- Admin Analytics Dashboard
- AI-based Product Recommendations
- Enhanced Product Search
- Advanced Filtering and Sorting
- Improved Admin Dashboard
- Additional Payment Gateway Integration

---