
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { loginService, registerService, getCurrentUser } from "../services/authService";
import { useToast } from "@/hooks/use-toast";

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
  error: string | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});

// Create provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for stored user and token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        console.log("Auth restored from localStorage");
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login for:", email);
      // Use real MongoDB backend through our service
      const { user: userData, token: authToken } = await loginService(email, password);
      
      if (!userData || !authToken) {
        throw new Error("Invalid response from server");
      }
      
      // Save to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
      
      // Update state
      setUser(userData);
      setToken(authToken);
      console.log("Login successful for:", userData.email);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
      toast({
        title: "Login failed",
        description: error.message || "Login failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Attempting registration for:", email);
      // Use real MongoDB backend through our service
      const { user: userData, token: authToken } = await registerService(name, email, password);
      
      if (!userData || !authToken) {
        throw new Error("Invalid response from server");
      }
      
      // Save to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
      
      // Update state
      setUser(userData);
      setToken(authToken);
      console.log("Registration successful for:", userData.email);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${userData.name}!`,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
      toast({
        title: "Registration failed",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setError(null);
    console.log("User logged out");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
