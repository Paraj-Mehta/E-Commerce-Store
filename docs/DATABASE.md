# Database Design

This document describes the MongoDB database structure used in the E-Commerce Store application, including the purpose of each collection, relationships between collections, and the overall data model.

---

# Database

The application uses **MongoDB** as its primary database, with **Mongoose** serving as the Object Data Modeling (ODM) library for schema definition and database interaction.

The database is organized into five collections:

- Users
- Products
- Categories
- Orders
- addToCart

---

# Database Relationships

The following diagram illustrates the relationships between collections.

```
Users
│
├── Places Orders
│        │
│        ▼
│     Orders
│        │
│        ├── References Products
│        ▼
│     Products
│        │
│        ▼
│   Categories
│
└── Owns
         │
         ▼
     addToCart
```

---

# Collections

## Users

Stores authentication and account information for every registered user.

### Fields

| Field | Type | Description |
|--------|------|-------------|
| name | String | User's full name |
| email | String | Unique email address |
| mobile | String | Contact number |
| password | String | Hashed password |
| role | String | Defines whether the user is an **Admin** or **User** |

### Purpose

- User authentication
- Authorization
- Order ownership
- Shopping cart ownership

---

## Products

Stores all products displayed in the application.

### Fields

| Field | Type | Description |
|--------|------|-------------|
| productName | String | Product name |
| description | String | Product description |
| price | Number | Product price |
| image | String | Cloudinary image URL |
| categories | ObjectId | Reference to a category |

### Purpose

- Display products
- Product management
- Shopping cart
- Order creation

---

## Categories

Organizes products into logical groups.

### Fields

| Field | Type | Description |
|--------|------|-------------|
| categoryName | String | Category name |
| image | String | Category image URL |

### Purpose

- Product organization
- Product categorization
- Navigation

Each product belongs to **one category**.

---

## addToCart

Stores each user's shopping cart.

### Purpose

Unlike client-side carts, this application stores cart data in MongoDB, allowing users to retain their cart even after logging out.

### Stored Information

- User
- Selected Products
- Quantity
- Total Cart Items

### Advantages

- Persistent cart
- Accessible across sessions
- Synchronized with authenticated user

---

## Orders

Stores completed customer orders.

### Fields

| Field | Type | Description |
|--------|------|-------------|
| userID | ObjectId | Reference to the user |
| items | Array | Purchased products |
| amount | Number | Total payable amount |
| currency | String | Payment currency |
| status | String | Payment status |
| orderId | String | Unique order identifier |

### Order Status

Possible values include:

- Pending
- Paid
- Cancelled

Each order references the products purchased by the user along with the selected quantities.

---

# Data Flow

The following illustrates how data moves through the application.

```
User

↓

Browse Products

↓

Add Product to Cart

↓

addToCart Collection

↓

Checkout

↓

Simulated Payment

↓

Order Collection

↓

Cart Cleared
```

---

# Image Storage

The application does not store uploaded images directly in MongoDB.

Instead, the following workflow is used:

```
Frontend

↓

Multer

↓

Cloudinary

↓

Image URL

↓

MongoDB
```

Only the Cloudinary image URL is stored in the database.

This approach minimizes database storage requirements while enabling optimized image delivery.

---

# Authentication Data

Authentication information is managed separately from application data.

### Stored in Database

- User Information
- Hashed Password
- User Role

### Stored in Browser

- JWT Access Token

The JWT token is stored in **Local Storage** after successful authentication and is attached to protected API requests using the Bearer authorization scheme.

---

# Design Considerations

The database structure was designed with the following objectives:

- Separate collections based on responsibility
- Minimize data duplication
- Use references for related documents
- Support role-based authentication
- Enable persistent shopping carts
- Simplify product and category management
- Allow future feature expansion

---

# Future Database Enhancements

The current database design can be extended to support additional functionality such as:

- Product Reviews
- Product Ratings
- Payment History
- Inventory Management
- Admin Activity Logs
- Product Recommendations

These additions can be implemented without major changes to the existing database structure.

---