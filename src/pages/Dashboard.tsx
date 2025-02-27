
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Utensils, MapPin, ArrowRight, Users, Plus, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RideCard } from "@/components/RideCard";
import { FoodCard } from "@/components/FoodCard";
import { ServiceToggle } from "@/components/ServiceToggle";
import { LocationSearch } from "@/components/LocationSearch";
import { UserAvatar } from "@/components/UserAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [serviceMode, setServiceMode] = useState<"food" | "ride">("food");
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
  };

  // Recent rides data
  const recentRides = [
    {
      driver: {
        name: "Michael Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
      },
      pickup: "Grand Central Terminal",
      destination: "Brooklyn Heights",
      departureTime: "Yesterday, 5:30 PM",
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
      departureTime: "May 15, 6:15 PM",
      availableSeats: 2,
      distance: "5.2 miles",
      price: 22.75,
      eta: "15 min",
    },
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: "1",
      name: "Urban Bistro",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "Yesterday, 7:30 PM",
      distance: "1.2 mi",
      priceRange: "$$$",
    },
    {
      id: "2",
      name: "Sakura Sushi",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "May 10, 8:15 PM",
      distance: "2.0 mi",
      priceRange: "$$$$",
    },
  ];

  // Nearby restaurants data
  const nearbyRestaurants = [
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
    {
      id: "4",
      name: "Pasta Palace",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhc3RhfGVufDB8fDB8fHww",
      cuisine: "Italian",
      rating: 4.6,
      deliveryTime: "20-35 min",
      distance: "1.5 mi",
      priceRange: "$$$",
    },
    {
      id: "5",
      name: "Noodle House",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
      cuisine: "Asian",
      rating: 4.7,
      deliveryTime: "15-30 min",
      distance: "1.1 mi",
      priceRange: "$$",
    },
  ];

  // Available rides data
  const availableRides = [
    {
      driver: {
        name: "Jessica Lee",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4.7,
      },
      pickup: "Current Location",
      destination: "Financial District",
      departureTime: "6:00 PM Today",
      availableSeats: 2,
      distance: "4.5 miles",
      price: 18.25,
      eta: "12 min",
    },
    {
      driver: {
        name: "Robert Chen",
        avatar: "https://randomuser.me/api/portraits/men/91.jpg",
        rating: 4.9,
      },
      pickup: "Current Location",
      destination: "Chelsea",
      departureTime: "6:15 PM Today",
      availableSeats: 3,
      distance: "3.2 miles",
      price: 15.5,
      eta: "10 min",
    },
    {
      driver: {
        name: "Emily Wilson",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        rating: 4.8,
      },
      pickup: "Current Location",
      destination: "Williamsburg",
      departureTime: "6:30 PM Today",
      availableSeats: 1,
      distance: "5.8 miles",
      price: 24.75,
      eta: "22 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={true}
        userName="Regular User"
        onLoginClick={() => {}}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      <div className="pt-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-night-800">Dashboard</h1>
              <p className="text-night-600">
                Welcome back! Your current location: <span className="font-medium">{currentLocation}</span>
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ServiceToggle 
                value={serviceMode} 
                onChange={setServiceMode}
              />
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button 
              variant="outline"
              className="h-auto py-4 px-6 justify-start gap-3 bg-white shadow-sm"
              onClick={() => navigate(serviceMode === "food" ? "/food-order" : "/ride-share")}
            >
              {serviceMode === "food" ? (
                <>
                  <Utensils className="h-5 w-5 text-urban-500" />
                  <div className="text-left">
                    <div className="font-semibold text-night-800">Order Food</div>
                    <div className="text-xs text-night-600">Find and order from restaurants near you</div>
                  </div>
                </>
              ) : (
                <>
                  <Car className="h-5 w-5 text-urban-500" />
                  <div className="text-left">
                    <div className="font-semibold text-night-800">Request Ride</div>
                    <div className="text-xs text-night-600">Get a ride to your destination</div>
                  </div>
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-4 px-6 justify-start gap-3 bg-white shadow-sm"
              onClick={() => {
                setServiceMode(serviceMode === "food" ? "ride" : "food");
                toast({
                  title: `Switched to ${serviceMode === "food" ? "ride" : "food"} mode`,
                  description: `You're now in ${serviceMode === "food" ? "ride" : "food"} mode.`,
                });
              }}
            >
              {serviceMode === "food" ? (
                <>
                  <Car className="h-5 w-5 text-urban-500" />
                  <div className="text-left">
                    <div className="font-semibold text-night-800">Add a Ride</div>
                    <div className="text-xs text-night-600">Add ride service to your food order</div>
                  </div>
                </>
              ) : (
                <>
                  <Utensils className="h-5 w-5 text-urban-500" />
                  <div className="text-left">
                    <div className="font-semibold text-night-800">Add Food</div>
                    <div className="text-xs text-night-600">Pick up food during your ride</div>
                  </div>
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-4 px-6 justify-start gap-3 bg-white shadow-sm"
              onClick={() => {
                if (serviceMode === "ride") {
                  navigate("/ride-share?sharing=true");
                } else {
                  toast({
                    title: "Feature available in ride mode",
                    description: "Please switch to ride mode to share rides.",
                  });
                  setServiceMode("ride");
                }
              }}
            >
              <Users className="h-5 w-5 text-urban-500" />
              <div className="text-left">
                <div className="font-semibold text-night-800">Share Ride</div>
                <div className="text-xs text-night-600">Find people to share your ride with</div>
              </div>
            </Button>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-night-800">Upcoming Orders & Rides</h2>
                  <Button variant="link" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-200 rounded-lg py-10 px-4 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-urban-50 text-urban-500 rounded-full mb-4">
                    <Plus className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-night-800 mb-2">No upcoming orders or rides</h3>
                  <p className="text-night-600 max-w-md mb-4">
                    Order food or request a ride to start saving time and money with our combined services.
                  </p>
                  <Button 
                    onClick={() => navigate(serviceMode === "food" ? "/food-order" : "/ride-share")}
                    className="gap-2"
                  >
                    {serviceMode === "food" ? "Order Food" : "Request Ride"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-night-800">Today's Suggestions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceMode === "food" ? (
                    <>
                      {nearbyRestaurants.slice(0, 2).map((restaurant) => (
                        <FoodCard 
                          key={restaurant.id}
                          restaurant={restaurant}
                          variant="small"
                          onClick={() => navigate(`/food-order?restaurant=${restaurant.id}`)}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {availableRides.slice(0, 2).map((ride, index) => (
                        <RideCard 
                          key={index}
                          {...ride}
                          variant="small"
                          onRequestRide={() => navigate(`/ride-share?ride=${index}`)}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-night-800">
                    Recent {serviceMode === "food" ? "Orders" : "Rides"}
                  </h2>
                  <Button variant="link" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceMode === "food" ? (
                    <>
                      {recentOrders.map((order) => (
                        <FoodCard 
                          key={order.id}
                          restaurant={order}
                          variant="small"
                          onClick={() => navigate(`/food-order?restaurant=${order.id}`)}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {recentRides.map((ride, index) => (
                        <RideCard 
                          key={index}
                          {...ride}
                          variant="small"
                          onRequestRide={() => navigate(`/ride-share?ride=${index}`)}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-night-800 mb-4">Your Stats</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-gray-100 bg-gray