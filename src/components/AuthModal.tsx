
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: (user: { name: string; email: string; role: string }) => void;
}

export function AuthModal({ open, onOpenChange, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { login, register } = useAuth();
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login for:", loginForm.email);
      // Connect to MongoDB backend via AuthContext
      await login(loginForm.email, loginForm.password);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess({
          name: loginForm.email, // This will be updated with actual name after login
          email: loginForm.email,
          role: "user", // This will be updated with actual role after login
        });
      }
      
      onOpenChange(false);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate form
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords don't match");
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("Attempting registration for:", registerForm.email);
      // Connect to MongoDB backend via AuthContext
      await register(registerForm.name, registerForm.email, registerForm.password);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      // Automatically log in after successful registration
      if (onLoginSuccess) {
        onLoginSuccess({
          name: registerForm.name,
          email: registerForm.email,
          role: "user", // Default role for new users
        });
      }
      
      onOpenChange(false);
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateLoginForm = (field: keyof typeof loginForm, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error when form is updated
  };
  
  const updateRegisterForm = (field: keyof typeof registerForm, value: string) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error when form is updated
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-night-800">
            Welcome to UrbanDashX
          </DialogTitle>
        </DialogHeader>
        
        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={(v) => {
            setActiveTab(v as "login" | "register");
            setError(null);
          }}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mt-4 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) => updateLoginForm("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" size="sm" className="px-0 h-auto" type="button">
                    Forgot Password?
                  </Button>
                </div>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => updateLoginForm("password", e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  placeholder="Enter your full name"
                  value={registerForm.name}
                  onChange={(e) => updateRegisterForm("name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerForm.email}
                  onChange={(e) => updateRegisterForm("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerForm.password}
                  onChange={(e) => updateRegisterForm("password", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => updateRegisterForm("confirmPassword", e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
