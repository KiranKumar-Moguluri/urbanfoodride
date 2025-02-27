
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export function AuthModal({ open, onOpenChange, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo hardcoded login for admin and user
      if (
        (loginForm.username === "admin" && loginForm.password === "admin") ||
        (loginForm.username === "user" && loginForm.password === "user")
      ) {
        const isAdmin = loginForm.username === "admin";
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${isAdmin ? "Admin" : "User"}!`,
        });
        
        onLoginSuccess({
          name: isAdmin ? "Admin User" : "Regular User",
          email: isAdmin ? "admin@urbandashx.com" : "user@example.com",
          role: isAdmin ? "admin" : "user",
        });
        
        onOpenChange(false);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password. Try admin/admin or user/user",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      setActiveTab("login");
      setLoginForm({
        username: registerForm.email,
        password: "",
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  const updateLoginForm = (field: keyof typeof loginForm, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };
  
  const updateRegisterForm = (field: keyof typeof registerForm, value: string) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
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
          onValueChange={(v) => setActiveTab(v as "login" | "register")}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <Input 
                  id="username"
                  placeholder="Enter your username or email"
                  value={loginForm.username}
                  onChange={(e) => updateLoginForm("username", e.target.value)}
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
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo Accounts:</p>
              <p className="mt-1 font-medium text-night-800">
                admin / admin &nbsp;|&nbsp; user / user
              </p>
            </div>
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
