const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { initializeProducer } = require('./services/kafkaService');
const { initOrderConsumers } = require('./services/orderConsumerService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://f42e54fb-635c-4ef4-a66f-db05262feb67.lovableproject.com'], // Add your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true // Allow credentials (cookies)
}));

// Debug connection string (remove sensitive info)
console.log('MongoDB connection attempt starting...');
console.log('MongoDB URI format check:', process.env.MONGO_URI ? 'URI exists' : 'URI missing');

// MongoDB Connection - using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    // More detailed error information
    if (err.name === 'MongoParseError') {
      console.error('Invalid MongoDB connection string format');
    } else if (err.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB servers');
    }
  });

// Initialize Kafka
(async () => {
  try {
    await initializeProducer();
    console.log('Kafka producer initialized');
    
    // Initialize consumers after producer is ready
    await initOrderConsumers();
    console.log('Kafka consumers initialized');
  } catch (error) {
    console.error('Failed to initialize Kafka:', error);
    // Continue app execution even if Kafka fails
  }
})();

// User Schema
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
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'urbandashx-secret-key';

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('UrbanDashX API is running');
});

// Auth routes (register, login, get user)
// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    console.log('User created successfully:', { id: user._id, email: user.email });
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid login - user not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid login - password mismatch:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('User logged in successfully:', { id: user._id, email: user.email });
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Middleware to verify token
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protected route - Get current user
app.get('/api/auth/user', auth, async (req, res) => {
  try {
    console.log('Get user request received, userId:', req.user.userId);
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Food order and ride request routes
// Create a new route for food orders with Kafka integration
const { sendMessage, TOPICS } = require('./services/kafkaService');

// Food order route - publishes to Kafka
app.post('/api/food-orders', auth, async (req, res) => {
  try {
    const { items, restaurantId, deliveryAddress } = req.body;
    
    // Create order object
    const order = {
      orderId: `ORDER-${Date.now()}`,
      userId: req.user.userId,
      items,
      restaurantId,
      deliveryAddress,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    
    // Publish to Kafka
    const published = await sendMessage(TOPICS.FOOD_ORDER_CREATED, order);
    
    if (published) {
      res.status(201).json({
        success: true,
        message: 'Food order created and published to event stream',
        order
      });
    } else {
      // Even if Kafka fails, we still return success to client
      // In a real application, you might want to save to database as fallback
      res.status(201).json({
        success: true,
        message: 'Food order created but failed to publish to event stream',
        order
      });
    }
  } catch (error) {
    console.error('Error creating food order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ride request route - publishes to Kafka
app.post('/api/ride-requests', auth, async (req, res) => {
  try {
    const { pickupLocation, dropLocation, pickupTime, rideCapacity, associatedOrderId } = req.body;
    
    // Create ride request object
    const rideRequest = {
      requestId: `RIDE-${Date.now()}`,
      userId: req.user.userId,
      pickupLocation,
      dropLocation,
      pickupTime,
      rideCapacity,
      associatedOrderId, // Link to food order if applicable
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    
    // Publish to Kafka
    const published = await sendMessage(TOPICS.RIDE_REQUEST_CREATED, rideRequest);
    
    if (published) {
      res.status(201).json({
        success: true,
        message: 'Ride request created and published to event stream',
        rideRequest
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Ride request created but failed to publish to event stream',
        rideRequest
      });
    }
  } catch (error) {
    console.error('Error creating ride request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API accessible at http://localhost:${PORT}/api/auth`);
});
