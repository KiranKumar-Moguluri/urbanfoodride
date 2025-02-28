
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Create provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - this would connect to a MongoDB backend API in production
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - in production this would be a real API endpoint
      // connecting to MongoDB
      if (
        (email === "admin@urbandashx.com" && password === "admin") ||
        (email === "user@example.com" && password === "user")
      ) {
        const isAdmin = email === "admin@urbandashx.com";
        
        // Create mock user data - in production this would come from MongoDB
        const userData: User = {
          id: isAdmin ? "admin-123" : "user-456",
          name: isAdmin ? "Admin User" : "Regular User",
          email: email,
          role: isAdmin ? "admin" : "user",
        };
        
        // Save to local storage - this simulates session persistence
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Update state
        setUser(userData);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - this would connect to a MongoDB backend API in production
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call - in production this would create a user in MongoDB
      // Simulating a successful registration
      console.log("Registering user:", { name, email });
      
      // In production, we would create a user in MongoDB here
      // and then login automatically
      
      // For now, we'll just return success
      return Promise.resolve();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
