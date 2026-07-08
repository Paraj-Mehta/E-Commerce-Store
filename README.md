# E-Commerce Store

A full-stack e-commerce web application built using the **MERN Stack** that provides a seamless online shopping experience for customers and a dedicated admin interface for managing products and categories.

The project demonstrates secure authentication using JWT, role-based authorization, Cloudinary image management, persistent shopping carts, and a responsive user interface built with React.

---

## Live Demo

| Service | Link |
|---------|------|
| Frontend | https://e-commerce-three-mu-56.vercel.app/ |
| Backend API | https://e-commerce-store-five-blush.vercel.app/ |

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Author](#author)

---

# Project Overview

E-Commerce Store is a full-stack web application developed to explore real-world e-commerce workflows using modern web technologies.

The application provides secure user authentication, role-based access control, product and category management, Cloudinary image uploads, persistent shopping carts, and a simple checkout flow with a simulated payment gateway.

The project follows a RESTful architecture and separates frontend and backend responsibilities to maintain scalability and clean code organization.

---

# Key Features

## User

- User Registration & Login
- JWT Authentication
- Browse Products
- View Product Details
- Add Products to Cart
- Persistent Shopping Cart
- Checkout with Simulated Net Banking
- Order Placement
- View Previous Orders
- Contact Page

## Admin

- Secure Admin Login
- Add Products
- Edit Products
- Delete Products
- Add Categories
- Edit Categories
- Delete Categories
- Cloudinary Image Upload

---

# Technology Stack

## Frontend

- React 19
- Vite
- Bootstrap 5
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

---

# Project Structure

```
E-Commerce-Store
│
├── client
│   ├── assets
│   ├── components
│   ├── context
│   ├── layouts
│   └── pages
│
├── server
│   ├── middleware
│   ├── models
│   └── routes
│
└── docs
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Paraj-Mehta/E-Commerce-Store.git
cd E-Commerce-Store
```

## Backend

```bash
cd server
npm install
npm start
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the server directory.

```env
MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

---

# Authentication

- JWT-based authentication
- Access token stored in Local Storage
- Token expiry: **1 Hour**
- Protected API routes use

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Database Collections

- Users
- Products
- Categories
- Orders
- addToCart

---

# Documentation

Additional project documentation is available in the `docs` directory.

| Document | Description |
|----------|-------------|
| FEATURES.md | Detailed project features |
| API.md | API overview |
| DATABASE.md | Database schema and relationships |
| DEPLOYMENT.md | Deployment and environment setup |
| CONTRIBUTING.md | Contribution guidelines |

---

# Current Limitations

The following features are planned but not yet implemented.

- Forgot Password
- Profile Picture Upload
- Product Search
- Product Sorting
- Product Reviews
- Admin Analytics
- Product Recommendations

---

# Roadmap

- Product Reviews
- Admin Analytics Dashboard
- Product Recommendation System
- Enhanced Admin Controls
- Improved Product Discovery

---

# Why This Project?

This project was built to gain practical experience in designing and developing a full-stack web application using the MERN stack while implementing real-world concepts such as authentication, REST APIs, image management, role-based authorization, and database integration.

---

# Author

**Paraj Mehta**

GitHub:
https://github.com/Paraj-Mehta

Repository:
https://github.com/Paraj-Mehta/E-Commerce-Store

---

## License

This project is intended for educational and portfolio purposes.
