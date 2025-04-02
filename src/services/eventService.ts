
import { User } from "../contexts/AuthContext";

// API URLs
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5000" 
  : "https://urbandashx-backend.onrender.com";

const API_URL = `${API_BASE_URL}/api`;

// Interface for food order
interface FoodOrderEvent {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  restaurantId: string;
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
    notes?: string;
  }
}

// Interface for ride request
interface RideRequestEvent {
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
  rideCapacity: number;
  associatedOrderId?: string;
}

// Get auth token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Create food order and publish to Kafka
export const createFoodOrder = async (order: FoodOrderEvent): Promise<any> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_URL}/food-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(order)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create food order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create food order error:', error);
    throw error;
  }
};

// Create ride request and publish to Kafka
export const createRideRequest = async (rideRequest: RideRequestEvent): Promise<any> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`${API_URL}/ride-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rideRequest)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create ride request');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create ride request error:', error);
    throw error;
  }
};
