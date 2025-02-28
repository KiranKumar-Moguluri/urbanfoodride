
import { User } from "../contexts/AuthContext";

const API_URL = "http://localhost:5000/api/auth";

export const loginService = async (email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerService = async (name: string, email: string, password: string): Promise<{user: User, token: string}> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user data');
    }
    
    const data = await response.json();
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
