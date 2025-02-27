
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter, MapPin, ShoppingBag, Car, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { FoodCard } from "@/components/FoodCard";
import { LocationSearch } from "@/components/LocationSearch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const FoodOrder = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [cart, setCart] = useState<{items: any[], total: number}>({ items: [], total: 0 });
  const [offerRideEnabled, setOfferRideEnabled] = useState(false);
  const [showOfferRideSheet, setShowOfferRideSheet] = useState(false);
  const [rideCapacity, setRideCapacity] = useState(1);
  const [rideTime, setRideTime] = useState("18:00");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get("restaurant");
    if (restaurantId) {
      setSelectedRestaurant(restaurantId);
    }
  }, [location]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
  };

  const handleOrderFood = (restaurant: any) => {
    const newCartItem = {
      id: Date.now(),
      restaurant: restaurant,
      quantity: 1,
      price: 15.99,
    };
    
    setCart(prev => ({
      items: [...prev.items, newCartItem],
      total: prev.total + 15.99,
    }));
    
    toast({
      title: "Added to cart",
      description: `Item from ${restaurant.name} added to your cart`,
    });
  };

  const handleOfferRide = () => {
    // Close the sheet
    setShowOfferRideSheet(false);
    
    // Enable ride offering
    setOfferRideEnabled(true);
    
    toast({
      title: "Ride Offering Enabled",
      description: `You'll be offering a ride for ${rideCapacity} passenger(s) at ${rideTime}`,
    });
  };

  const handleCheckout = () => {
    // If offering ride, add that information to the URL
    if (offerRideEnabled) {
      navigate(`/checkout?offerRide=true&capacity=${rideCapacity}&time=${rideTime}`);
    } else {
      navigate('/checkout');
    }
  };

  // Restaurant data
  const restaurants = [
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
    {
      id: "6",
      name: "Burger Joint",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8fDB8fHww",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "10-20 min",
      distance: "0.5 mi",
      priceRange: "$$",
    },
  ];

  const filteredRestaurants = searchQuery 
    ? restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={true}
        userName="Regular User"
        onLoginClick={() => {}}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-night-800">Food Ordering</h1>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="flex items-center gap-1 text-night-600 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1 max-w-[200px]">{currentLocation}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-shrink-0"
                onClick={() => setLocationModalOpen(true)}
              >
                Change
              </Button>
            </div>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-night-400" />
            <Input 
              placeholder="Search for restaurants or cuisines..." 
              className="pl-10 pr-10 py-6 rounded-xl border-night-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-night-500"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Offer a Ride Banner */}
          {!offerRideEnabled && (
            <div className="bg-urban-50 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-urban-100 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-urban-600" />
                </div>
                <div>
                  <h3 className="font-medium text-night-800">Want to offer a ride?</h3>
                  <p className="text-sm text-night-600">Save money by offering a ride to others while picking up your food</p>
                </div>
              </div>
              
              <Sheet open={showOfferRideSheet} onOpenChange={setShowOfferRideSheet}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">Offer Ride</Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="space-y-6 pt-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Car className="h-5 w-5 text-urban-600" />
                      Offer a Ride
                    </h2>
                    
                    <p className="text-night-600">
                      You can offer a ride to others when you pick up your food order. Set your preferences below:
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <label htmlFor="capacity" className="text-sm font-medium text-night-700">Passenger Capacity</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                          <Input 
                            id="capacity"
                            type="number"
                            min="1"
                            max="4"
                            className="pl-9"
                            value={rideCapacity}
                            onChange={(e) => setRideCapacity(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium text-night-700">Pickup Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                          <Input 
                            id="time"
                            type="time"
                            className="pl-9"
                            value={rideTime}
                            onChange={(e) => setRideTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-8">
                      <Button className="flex-1" onClick={handleOfferRide}>
                        Confirm
                      </Button>
                      <SheetClose asChild>
                        <Button variant="outline" className="flex-1">
                          Cancel
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
          
          {/* Ride Offering Banner (when enabled) */}
          {offerRideEnabled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-night-800">Ride Offering Active</h3>
                    <p className="text-sm text-night-600">
                      You're offering a ride for {rideCapacity} passenger(s) at {rideTime}
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  onClick={() => {
                    setOfferRideEnabled(false);
                    toast({
                      title: "Ride Offering Disabled",
                      description: "You're no longer offering a ride with your order",
                    });
                  }}
                >
                  Cancel Ride
                </Button>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <FoodCard 
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => handleOrderFood(restaurant)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nearby" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants
                  .filter(r => parseFloat(r.distance) < 1.0)
                  .map((restaurant) => (
                    <FoodCard 
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleOrderFood(restaurant)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants
                  .filter(r => r.rating >= 4.5)
                  .map((restaurant) => (
                    <FoodCard 
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleOrderFood(restaurant)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants
                  .filter(r => r.featured)
                  .map((restaurant) => (
                    <FoodCard 
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleOrderFood(restaurant)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {cart.items.length > 0 && (
            <div className="fixed bottom-5 left-0 right-0 px-4 z-10">
              <div className="max-w-md mx-auto">
                <Button 
                  className="w-full py-6 shadow-lg rounded-xl justify-between group"
                  onClick={handleCheckout}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>View Cart ({cart.items.length} items)</span>
                    {offerRideEnabled && (
                      <span className="text-xs bg-green-200 text-green-800 py-0.5 px-2 rounded-full">
                        + Ride
                      </span>
                    )}
                  </div>
                  <div className="font-semibold">
                    ${cart.total.toFixed(2)}
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
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
      
      <LocationSearch 
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default FoodOrder;
