
import { User } from "../contexts/AuthContext";

// API URLs - we'll add a mock implementation
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000" 
  : "https://urbandashx-backend.onrender.com"; // This server isn't accessible

const API_URL = `${API_BASE_URL}/api/auth`;

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin",  // In a real app, this would be hashed
    role: "admin"
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "password",
    role: "user"
  }
];

// Check if we should use mock implementation
const USE_MOCK = true; // Set to true to use mock implementation

export const loginService = async (email: string, password: string): Promise<{user: User, token: string}> => {
  // Log attempt
  console.log('Login attempt for:', email);
  
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      console.error('Login failed: Invalid credentials');
      throw new Error('Invalid email or password');
    }
    
    // Create a mock token (in a real app, this would be a JWT)
    const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
    
    console.log('Login successful for:', email);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
  
  // Actual API implementation (only used if USE_MOCK is false)
  try {
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `Server returned ${response.status}: ${response.statusText}` 
      }));
      console.error('Login failed:', errorData.message || 'Unknown error');
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    console.log('Login successful for:', email);
    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.name === 'TypeError' && (error.message.includes('Failed to fetch') || error.message.includes('Load failed'))) {
      throw new Error('Cannot connect to the server. Please make sure the backend is running at ' + API_URL);
    }
    throw error;
  }
};

export const registerService = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  console.log('Registering user:', { name, email });
  
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      console.error('Registration failed: User already exists');
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      password,
      role: "user"
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Create mock token
    const token = btoa(`${newUser.id}:${newUser.email}:${Date.now()}`);
    
    console.log('Registration successful:', newUser);
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    };
  }
  
  // Actual API implementation (only used if USE_MOCK is false)
  try {
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `Server returned ${response.status}: ${response.statusText}` 
      }));
      console.error('Registration failed:', errorData.message || 'Unknown error');
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    console.log('Registration successful:', data);
    return data;
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.name === 'TypeError' && (error.message.includes('Failed to fetch') || error.message.includes('Load failed'))) {
      throw new Error('Cannot connect to the server. Please make sure the backend is running at ' + API_URL);
    }
    throw error;
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  console.log('Getting current user with token');
  
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // In a real app, we would decode and verify the JWT
      // Here we just decode our simple token
      const [id] = atob(token).split(':');
      const user = MOCK_USERS.find(u => u.id === id);
      
      if (!user) {
        throw new Error('Invalid token');
      }
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
    } catch (error) {
      console.error('Error parsing token:', error);
      throw new Error('Invalid token');
    }
  }
  
  // Actual API implementation (only used if USE_MOCK is false)
  try {
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      mode: 'cors'
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `Server returned ${response.status}: ${response.statusText}` 
      }));
      console.error('Failed to get user data:', errorData.message || 'Unknown error');
      throw new Error(errorData.message || 'Failed to get user data');
    }
    
    const data = await response.json();
    
    return {
      id: data._id || data.id,
      name: data.name,
      email: data.email,
      role: data.role || 'user'
    };
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
