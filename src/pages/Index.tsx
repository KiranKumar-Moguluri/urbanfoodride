import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { LocationSearch } from "@/components/LocationSearch";
import { ServiceToggle } from "@/components/ServiceToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLocationSelect = (location: string) => {
    // Handle location selection logic here
  };

  const handleLoginSuccess = (userData: { name: string; email: string; role: string }) => {
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.name}`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={!!user}
        userName={user?.name || "Guest User"}
        onLoginClick={() => setAuthModalOpen(true)}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <LocationSearch 
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default Index;
