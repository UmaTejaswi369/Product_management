# Product Management Application

A full-stack web application for managing products with CRUD operations, built with React, Node.js, Express, and MongoDB.

## Features

### Frontend (React)
- ✅ Product List Page with grid display
- ✅ Add Product Form with validation
- ✅ Reusable ProductCard component
- ✅ Delete products with confirmation modal
- ✅ Sort products by price (low to high, high to low)
- ✅ Search products by name
- ✅ Responsive design with Tailwind CSS
- ✅ Functional components with React hooks

### Backend (Node.js + Express)
- ✅ RESTful API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and error handling
- ✅ CORS configuration
- ✅ Rate limiting and security middleware
- ✅ Search and filtering capabilities

### Database (MongoDB)
- ✅ Product schema with validation
- ✅ Indexed fields for better performance
- ✅ CRUD operations

## Project Structure

```
project-bolt-sb1-aavykrrs/
├── project/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── apis/           # API integration
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                # Backend (Node.js + Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

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

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/product_management
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. Start the backend server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the project directory:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports search and sorting)
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

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Helmet (security)
- Express Rate Limit

## Development Notes

- The frontend uses functional components with React hooks
- All API calls are centralized in the `apis/productApi.js` file
- The backend includes comprehensive error handling and validation
- MongoDB indexes are configured for optimal query performance
- CORS is configured to allow frontend-backend communication

## Usage

1. Start MongoDB service on your machine
2. Run the backend server: `cd backend && npm run dev`
3. Run the frontend server: `cd project && npm run dev`
4. Open `http://localhost:5173` in your browser
5. Start adding, viewing, and managing products!
