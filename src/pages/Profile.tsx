
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, LogOut, MapPin, ShoppingBag, Car, Calendar, Clock, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "@/components/UserAvatar";
import { LocationSearch } from "@/components/LocationSearch";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile",
        variant: "destructive"
      });
    }
  }, [user, navigate, toast]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Use user data from auth context if available, otherwise use mock data
  const userData = user ? {
    name: user.name,
    email: user.email,
    phone: "+1 (555) 123-4567", // This would come from MongoDB in production
    address: currentLocation,
    memberSince: "January 2024",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // This would come from MongoDB in production
  } : {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: currentLocation,
    memberSince: "January 2024",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  // Mock order history - in production, this would come from MongoDB
  const orderHistory = [
    {
      id: "ORD-10124",
      date: "May 20, 2025",
      restaurant: "Urban Bistro",
      items: ["Chicken Parmesan", "Caesar Salad"],
      total: 32.99,
      status: "Delivered",
    },
    {
      id: "ORD-10089",
      date: "May 15, 2025",
      restaurant: "Taco Fiesta",
      items: ["Carne Asada Tacos (x2)", "Guacamole"],
      total: 24.95,
      status: "Delivered",
    },
    {
      id: "ORD-10042",
      date: "May 8, 2025", 
      restaurant: "Sakura Sushi",
      items: ["Dragon Roll", "Miso Soup", "Edamame"],
      total: 42.50,
      status: "Delivered",
    },
  ];

  // Mock ride history - in production, this would come from MongoDB
  const rideHistory = [
    {
      id: "RIDE-5089",
      date: "May 19, 2025",
      pickup: "Grand Central Terminal",
      destination: "Brooklyn Heights",
      driver: "Michael Johnson",
      fare: 28.50,
      status: "Completed",
    },
    {
      id: "RIDE-4967",
      date: "May 12, 2025",
      pickup: "SoHo",
      destination: "Upper East Side",
      driver: "Sarah Davis",
      fare: 22.75,
      status: "Completed",
    },
  ];

  // For offering rides
  const handleOfferRide = () => {
    navigate("/ride-share?mode=offer");
    toast({
      title: "Offer a Ride",
      description: "Complete your ride details to start offering rides.",
    });
  };

  // If not logged in and still loading, show nothing
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={true}
        userName={userData.name}
        userAvatar={userData.avatar}
        onLoginClick={() => {}}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-night-800">Your Profile</h1>
          </div>
          
          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col items-center mb-4">
                  <UserAvatar 
                    src={userData.avatar} 
                    name={userData.name} 
                    size="lg" 
                    status="online" 
                  />
                  
                  <h2 className="mt-4 font-semibold text-xl">{userData.name}</h2>
                  <p className="text-night-600 text-sm">{userData.email}</p>
                  
                  <div className="w-full mt-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-night-400" />
                    <div>
                      <div className="text-sm text-night-600">Phone Number</div>
                      <div className="font-medium">{userData.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-night-400" />
                    <div>
                      <div className="text-sm text-night-600">Address</div>
                      <div className="font-medium">{userData.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-night-400" />
                    <div>
                      <div className="text-sm text-night-600">Member Since</div>
                      <div className="font-medium">{userData.memberSince}</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="orders">
                  <TabsList className="p-4 border-b w-full justify-start gap-4">
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                    <TabsTrigger value="rides">Ride History</TabsTrigger>
                    <TabsTrigger value="offer">Offer a Ride</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="orders" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Your Orders</h3>
                        <Button variant="outline" size="sm" onClick={() => navigate("/food-order")}>
                          Order More Food
                        </Button>
                      </div>
                      
                      <div className="divide-y">
                        {orderHistory.map((order) => (
                          <div key={order.id} className="py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <ShoppingBag className="h-4 w-4 text-urban-600" />
                                  <span className="font-medium">{order.restaurant}</span>
                                  <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">{order.status}</span>
                                </div>
                                
                                <div className="text-sm text-night-600 mt-1">
                                  {order.items.join(", ")}
                                </div>
                              </div>
                              
                              <div className="md:text-right mt-2 md:mt-0">
                                <div className="font-medium">${order.total.toFixed(2)}</div>
                                <div className="text-xs text-night-600">{order.date}</div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm">Order Again</Button>
                              <Button variant="ghost" size="sm">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rides" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Your Rides</h3>
                        <Button variant="outline" size="sm" onClick={() => navigate("/ride-share")}>
                          Book a Ride
                        </Button>
                      </div>
                      
                      <div className="divide-y">
                        {rideHistory.map((ride) => (
                          <div key={ride.id} className="py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4 text-urban-600" />
                                  <span className="font-medium">{ride.pickup} to {ride.destination}</span>
                                  <span className="text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">{ride.status}</span>
                                </div>
                                
                                <div className="text-sm text-night-600 mt-1">
                                  Driver: {ride.driver}
                                </div>
                              </div>
                              
                              <div className="md:text-right mt-2 md:mt-0">
                                <div className="font-medium">${ride.fare.toFixed(2)}</div>
                                <div className="text-xs text-night-600">{ride.date}</div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm">Book Similar</Button>
                              <Button variant="ghost" size="sm">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="offer" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Offer a Ride</h3>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 flex items-center justify-center bg-urban-100 rounded-full mb-4">
                            <Car className="h-8 w-8 text-urban-600" />
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">Become a Driver Partner</h3>
                          <p className="text-night-600 max-w-md mb-6">
                            Share your ride with others, save on costs, reduce traffic, and earn extra income while helping the community.
                          </p>
                          
                          <div className="space-y-2 w-full max-w-xs">
                            <Button className="w-full" onClick={handleOfferRide}>
                              Offer a Ride Now
                            </Button>
                            
                            <Button variant="outline" className="w-full">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-urban-100 rounded-full">
                              <Clock className="h-4 w-4 text-urban-600" />
                            </div>
                            <h4 className="font-medium">Flexible Schedule</h4>
                          </div>
                          <p className="text-sm text-night-600">
                            Drive whenever it fits your schedule. No minimum hours required.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-urban-100 rounded-full">
                              <ShoppingBag className="h-4 w-4 text-urban-600" />
                            </div>
                            <h4 className="font-medium">Free Food Pickup</h4>
                          </div>
                          <p className="text-sm text-night-600">
                            Get discounts on restaurant orders when you combine with ride sharing.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-urban-100 rounded-full">
                              <User className="h-4 w-4 text-urban-600" />
                            </div>
                            <h4 className="font-medium">Meet New People</h4>
                          </div>
                          <p className="text-sm text-night-600">
                            Connect with people in your community while earning extra income.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
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

export default Profile;
