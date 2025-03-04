
import { User } from "../contexts/AuthContext";

const API_URL = "http://localhost:5000/api/auth";

export const loginService = async (email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    console.log('Login attempt for:', email);
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Login failed:', data.message);
      throw new Error(data.message || 'Login failed');
    }
    
    console.log('Login successful for:', email);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerService = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    console.log('Registering user:', { name, email });
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Registration failed:', data.message);
      throw new Error(data.message || 'Registration failed');
    }
    
    console.log('Registration successful:', data);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    console.log('Getting current user with token');
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Failed to get user data:', data.message);
      throw new Error(data.message || 'Failed to get user data');
    }
    
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    };
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
