import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { LocationSearch } from "@/components/LocationSearch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Car, Utensils, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceToggle } from "@/components/ServiceToggle";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [serviceMode, setServiceMode] = useState<"food" | "ride">("food");
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLocationSelect = (location: string) => {
    toast({
      title: "Location updated",
      description: location,
    });
  };

  const handleLoginSuccess = (userData: { name: string; email: string; role: string }) => {
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.name}`,
    });
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar 
        isLoggedIn={!!user}
        userName={user?.name || "Guest User"}
        onLoginClick={() => setAuthModalOpen(true)}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-night-800 leading-tight">
                Food & Rides, <span className="text-urban-600">All in One App</span>
              </h1>
              
              <p className="text-lg md:text-xl text-night-600 max-w-2xl">
                Order food and book rides seamlessly with UrbanDashX. Save time and money with our combined service.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => {
                    if (user) {
                      navigate("/dashboard");
                    } else {
                      setAuthModalOpen(true);
                    }
                  }}
                >
                  {user ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => setLocationModalOpen(true)}
                >
                  <MapPin className="h-4 w-4" />
                  Find Near Me
                </Button>
              </div>
            </div>
            
            <div className="flex-1 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-urban-100 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-50"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D" 
                    alt="Food Delivery" 
                    className="w-full h-72 object-cover rounded-xl mb-4" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <ServiceToggle 
                      value={serviceMode} 
                      onChange={setServiceMode}
                    />
                    
                    <Button 
                      onClick={() => navigate(serviceMode === "food" ? "/food-order" : "/ride-share")}
                      className="gap-1"
                    >
                      {serviceMode === "food" ? "Order Food" : "Request Ride"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-night-800 mb-4">How UrbanDashX Works</h2>
            <p className="text-night-600 max-w-2xl mx-auto">
              Combining food delivery and ride services in one seamless experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-urban-100 text-urban-600 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Set Your Location</h3>
              <p className="text-night-600">
                Share your location to find restaurants and drivers nearby.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-urban-100 text-urban-600 flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Order Food</h3>
              <p className="text-night-600">
                Browse local restaurants and order your favorite meals.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-urban-100 text-urban-600 flex items-center justify-center mb-4">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Book a Ride</h3>
              <p className="text-night-600">
                Request a ride or combine it with your food order for convenience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-urban-500 to-urban-600 rounded-2xl p-8 md:p-12 text-white shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to simplify your life?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are saving time and money with our combined food and ride service.
            </p>
            
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                if (user) {
                  navigate("/dashboard");
                } else {
                  setAuthModalOpen(true);
                }
              }}
              className="gap-2"
            >
              {user ? "Go to Dashboard" : "Sign Up Now"} 
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer with Founder Information */}
      <footer className="py-6 px-4 bg-white border-t text-center">
        <p className="text-night-700 text-sm font-medium">
          Kiran Kumar Moguluri
        </p>
        <p className="text-night-600 text-xs">
          Founder of UrbanDashX
        </p>
        <p className="text-night-500 text-xs mt-1">
          <a href="mailto:mogulurikirankumar@gmail.com" className="hover:text-urban-600">
            mogulurikirankumar@gmail.com
          </a>
        </p>
        <p className="text-night-500 text-xs mt-1">
          © 2025 UrbanDashX. All rights reserved.
        </p>
      </footer>
      
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
