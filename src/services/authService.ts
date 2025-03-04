
import { User } from "../contexts/AuthContext";

// Use the base URL of where the app is running, or fallback to localhost
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000" 
  : "https://urbandashx-backend.onrender.com"; // Replace with your actual deployed backend URL if you have one

const API_URL = `${API_BASE_URL}/api/auth`;

export const loginService = async (email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    console.log('Login attempt for:', email);
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Include cookies for cross-site requests
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Login failed:', data.message || 'Unknown error');
      throw new Error(data.message || 'Login failed');
    }
    
    console.log('Login successful for:', email);
    return data;
  } catch (error: any) {
    // More detailed error logging
    console.error('Login error:', error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to the server. Please make sure the backend is running at ' + API_URL);
    }
    throw error;
  }
};

export const registerService = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    console.log('Registering user:', { name, email });
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include' // Include cookies for cross-site requests
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Registration failed:', data.message || 'Unknown error');
      throw new Error(data.message || 'Registration failed');
    }
    
    console.log('Registration successful:', data);
    return data;
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to the server. Please make sure the backend is running at ' + API_URL);
    }
    throw error;
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    console.log('Getting current user with token');
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Changed from x-auth-token to Authorization header
      },
      credentials: 'include' // Include cookies for cross-site requests
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Failed to get user data:', data.message || 'Unknown error');
      throw new Error(data.message || 'Failed to get user data');
    }
    
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
