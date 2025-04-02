
My name is meet patel

# Car Rental Application

A web-based car rental management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (login/register)
- Browse available cars
- Add, edit, and delete car listings
- User-friendly interface
- Secure API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd car-rental-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

2. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Running the Application

### Development Mode

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## API Routes

- Authentication:
  - POST `/api/auth/register` - Register new user
  - POST `/api/auth/login` - Login user

- Cars:
  - GET `/api/cars` - Get all cars
  - POST `/api/cars` - Add new car
  - PUT `/api/cars/:id` - Update car
  - DELETE `/api/cars/:id` - Delete car

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request
