
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Car, Utensils, MapPin, PlusCircle, Clock, DollarSign } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { LocationSearch } from "@/components/LocationSearch";
import { ServiceToggle } from "@/components/ServiceToggle";
import { RideCard } from "@/components/RideCard";
import { FoodCard } from "@/components/FoodCard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("Select location");
  const [serviceMode, setServiceMode] = useState<"food" | "ride">("food");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setIsLoggedIn(true);
    setUserData(user);
    toast({
      title: "Welcome to UrbanDashX",
      description: `You're logged in as ${user.name}`,
    });
  };

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
  };
  
  const handleServiceModeChange = (mode: "food" | "ride") => {
    setServiceMode(mode);
    toast({
      title: `Switched to ${mode} mode`,
      description: `You're now viewing ${mode === "food" ? "restaurants" : "rides"}.`,
    });
  };

  // Sample featured restaurants
  const featuredRestaurants = [
    {
      id: "1",
      name: "Urban Bistro",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "20-30 min",
      distance: "1.2 mi",
      priceRange: "$$$",
      featured: true,
    },
    {
      id: "2",
      name: "Sakura Sushi",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "25-35 min",
      distance: "2.0 mi",
      priceRange: "$$$$",
      featured: true,
    },
    {
      id: "3",
      name: "Taco Fiesta",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFjb3N8ZW58MHx8MHx8fDA%3D",
      cuisine: "Mexican",
      rating: 4.5,
      deliveryTime: "15-25 min",
      distance: "0.8 mi",
      priceRange: "$$",
      featured: true,
    },
  ];

  // Sample trending rides
  const trendingRides = [
    {
      driver: {
        name: "Michael Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
      },
      pickup: "Grand Central Terminal",
      destination: "Brooklyn Heights",
      departureTime: "5:30 PM",
      availableSeats: 3,
      distance: "7.4 miles",
      price: 28.5,
      eta: "18 min",
      withFoodStop: true,
    },
    {
      driver: {
        name: "Sarah Davis",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9,
      },
      pickup: "SoHo",
      destination: "Upper East Side",
      departureTime: "6:15 PM",
      availableSeats: 2,
      distance: "5.2 miles",
      price: 22.75,
      eta: "15 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn}
        userName={userData?.name}
        onLoginClick={() => setAuthModalOpen(true)}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-night-800 mb-4 tracking-tight">
              Food & Rides, <span className="text-urban-600">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-night-600 max-w-2xl mx-auto">
              Combine food orders with ride sharing for the ultimate convenience and savings.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/dashboard");
                  } else {
                    setAuthModalOpen(true);
                  }
                }}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => setLocationModalOpen(true)}
              >
                <MapPin className="h-4 w-4" />
                {currentLocation === "Select location" ? "Set Your Location" : "Change Location"}
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-md mx-auto mt-10">
            <ServiceToggle 
              value={serviceMode} 
              onChange={handleServiceModeChange}
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-night-800 mb-4">How It Works</h2>
            <p className="text-night-600 max-w-2xl mx-auto">
              UrbanDashX combines food delivery and ride sharing in one seamless experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Set Your Location</h3>
              <p className="text-night-600">
                Enter your pickup location and destination to find available options.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <PlusCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Choose Your Combo</h3>
              <p className="text-night-600">
                Decide if you want to add food to your ride, or a ride to your food order.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-night-800 mb-2">Save Money</h3>
              <p className="text-night-600">
                Enjoy discounts when you combine services or share rides with others.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-night-800">
              {serviceMode === "food" ? "Featured Restaurants" : "Trending Rides"}
            </h2>
            
            <Button 
              variant="link" 
              className="gap-1"
              onClick={() => {
                if (isLoggedIn) {
                  navigate(serviceMode === "food" ? "/food-order" : "/ride-share");
                } else {
                  setAuthModalOpen(true);
                }
              }}
            >
              See All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceMode === "food" 
              ? featuredRestaurants.map((restaurant) => (
                <FoodCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setAuthModalOpen(true);
                    } else {
                      navigate(`/food-order?restaurant=${restaurant.id}`);
                      toast({
                        title: "Restaurant selected",
                        description: `You selected ${restaurant.name}`,
                      });
                    }
                  }}
                />
              ))
              : trendingRides.map((ride, index) => (
                <RideCard 
                  key={index}
                  {...ride}
                  onRequestRide={() => {
                    if (!isLoggedIn) {
                      setAuthModalOpen(true);
                    } else {
                      navigate(`/ride-share?ride=${index}`);
                      toast({
                        title: "Ride requested",
                        description: `Your ride from ${ride.pickup} to ${ride.destination} has been requested.`,
                      });
                    }
                  }}
                />
              ))
            }
          </div>
        </div>
      </section>
      
      {/* Benefits & Features */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-night-800 mb-4">Benefits & Features</h2>
            <p className="text-night-600 max-w-2xl mx-auto">
              Discover why UrbanDashX is the smartest way to get around and get your food.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-night-800 mb-2">Save Money</h3>
              <p className="text-night-600 text-sm">
                Get discounts when you combine food and ride services together.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-night-800 mb-2">Save Time</h3>
              <p className="text-night-600 text-sm">
                Efficient routing means you'll get your food faster while on the go.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <Utensils className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-night-800 mb-2">Quality Food</h3>
              <p className="text-night-600 text-sm">
                Partner with top-rated restaurants for the best dining experience.
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-urban-50 text-urban-600 rounded-full mb-4">
                <Car className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-night-800 mb-2">Reliable Rides</h3>
              <p className="text-night-600 text-sm">
                Vetted drivers ensure safe and comfortable transportation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-urban-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join UrbanDashX today and experience the convenience of combined food and ride services.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="gap-2 bg-white text-urban-600 hover:bg-white/90 hover:text-urban-700"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/dashboard");
                } else {
                  setAuthModalOpen(true);
                }
              }}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-night-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-urban-500 text-white flex items-center justify-center font-bold mr-2">
                  UX
                </div>
                UrbanDashX
              </h3>
              <p className="text-white/70 text-sm">
                Combining food delivery and ride sharing for ultimate convenience.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li>Food Delivery</li>
                <li>Ride Sharing</li>
                <li>Combined Services</li>
                <li>Business Accounts</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-sm">
              <p>© 2025 UrbanDashX. All rights reserved.</p>
              <p className="mt-2">
                <span className="font-medium text-white">Kiran Kumar Moguluri</span> - Founder
              </p>
              <p className="mt-1">
                <a href="mailto:mogulurikirankumar@gmail.com" className="hover:text-urban-300">
                  mogulurikirankumar@gmail.com
                </a>
              </p>
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Modals */}
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
