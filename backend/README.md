# Product Management Backend

A Node.js/Express REST API for managing products with MongoDB integration.

## Features

- CRUD operations for products
- MongoDB integration with Mongoose
- Input validation and error handling
- Search and filtering capabilities
- Sorting by price, name, category
- CORS enabled for frontend integration
- Rate limiting and security middleware

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/product_management
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Products

- `GET /api/products` - Get all products
  - Query parameters: `search`, `sortBy`, `category`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check

- `GET /api/health` - Server health status

## Product Schema

```javascript
{
  name: String (required, max 100 chars),
  price: Number (required, min 0),
  description: String (required, max 500 chars),
  category: String (required, enum values),
  createdAt: Date,
  updatedAt: Date
}
```

## Valid Categories

- Electronics
- Kitchen
- Furniture
- Clothing
- Books
- Sports
- Beauty
- Other
