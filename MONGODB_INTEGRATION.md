
# MongoDB Integration

This document provides instructions on how to set up a real MongoDB backend for the UrbanDashX application.

## Current Implementation

Currently, the app uses a simulated MongoDB integration with:
- AuthContext for managing authentication state
- Mock authentication services in authService.ts
- Local storage for persisting sessions

## Setting Up a Real MongoDB Backend

To implement a real MongoDB backend:

1. Set up a MongoDB database (either locally or using MongoDB Atlas)
2. Create a Node.js/Express backend with:
   - User authentication routes (login, register, logout)
   - User management
   - Database connection to MongoDB

### Backend Setup Steps:

1. Create a new Node.js project:
```bash
mkdir urbandashx-backend
cd urbandashx-backend
npm init -y
npm install express mongoose bcrypt jsonwebtoken cors dotenv
```

2. Set up your MongoDB connection and user schema:
```javascript
// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

3. Create a User model:
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

4. Create authentication routes:
```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    
    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user profile
router.get('/user', async (req, res) => {
  try {
    // Get user from token middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
```

5. Set up the main server file:
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Init middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

6. Create a .env file:
```
MONGO_URI=mongodb+srv://your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Updating the Frontend

After setting up the backend, you'll need to update the frontend AuthContext and authService.ts to make real API calls:

```javascript
// src/services/authService.ts
import { User } from "@/contexts/AuthContext";

const API_URL = "http://localhost:5000/api/auth";

export const loginService = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Login failed');
  }
  
  const data = await response.json();
  return data.user;
};

export const registerService = async (name: string, email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Registration failed');
  }
  
  return Promise.resolve();
};
```

## Development vs Production

For development, you can continue using the mock implementation. For production:

1. Set up environment variables to determine which implementation to use
2. Use a .env file to store your backend API URL
3. Update the AuthContext to use the real services when in production mode

## Data Models

For a complete implementation, you would need additional MongoDB models for:

1. User profiles
2. Food orders
3. Ride sharing
4. Reviews
5. Payment information

Each model would have corresponding API endpoints and frontend services.
