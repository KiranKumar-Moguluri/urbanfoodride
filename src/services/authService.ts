
// This file simulates a service that would connect to a MongoDB backend
// In a real application, this would make actual API calls to your backend

import { User } from "@/contexts/AuthContext";

// Mock database - in production, this would be MongoDB
const mockUsers = [
  {
    id: "admin-123",
    name: "Admin User",
    email: "admin@urbandashx.com",
    password: "admin", // In production, NEVER store plain text passwords
    role: "admin"
  },
  {
    id: "user-456",
    name: "Regular User",
    email: "user@example.com",
    password: "user", // In production, NEVER store plain text passwords
    role: "user"
  }
];

// Login service
export const loginService = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

// Register service
export const registerService = async (name: string, email: string, password: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user exists
  if (mockUsers.some(u => u.email === email)) {
    throw new Error("User already exists");
  }
  
  // In production, this would create a user in MongoDB
  console.log("User registered:", { name, email });
  
  // Just return success for now
  return Promise.resolve();
};
