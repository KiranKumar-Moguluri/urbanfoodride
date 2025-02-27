
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Search, MapPin, Clock, Plus, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { RideCard } from "@/components/RideCard";
import { LocationSearch } from "@/components/LocationSearch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const RideShare = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sharing = params.get("sharing");
    const rideId = params.get("ride");
    
    if (sharing === "true") {
      setIsSharingEnabled(true);
    }
    
    if (rideId) {
      // In a real app, you would fetch the ride details here
      toast({
        title: "Ride selected",
        description: `You selected ride #${rideId}`,
      });
    }
  }, [location, toast]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
  };

  const handleRequestRide = (ride: any) => {
    toast({
      title: "Ride requested",
      description: `Your ride from ${ride.pickup} to ${ride.destination} has been booked!`,
    });
  };

  // Available rides data
  const availableRides = [
    {
      driver: {
        name: "Jessica Lee",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4.7,
      },
      pickup: "Grand Central Terminal",
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
      pickup: "SoHo",
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
      pickup: "Times Square",
      destination: "Williamsburg",
      departureTime: "6:30 PM Today",
      availableSeats: 1,
      distance: "5.8 miles",
      price: 24.75,
      eta: "22 min",
    },
    {
      driver: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4.6,
      },
      pickup: "Upper East Side",
      destination: "Brooklyn Heights",
      departureTime: "7:00 PM Today",
      availableSeats: 2,
      distance: "6.2 miles",
      price: 26.50,
      eta: "25 min",
      withFoodStop: true,
    },
    {
      driver: {
        name: "Sarah Davis",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9,
      },
      pickup: "Union Square",
      destination: "Upper West Side",
      departureTime: "6:45 PM Today",
      availableSeats: 4,
      distance: "4.0 miles",
      price: 19.99,
      eta: "18 min",
    },
    {
      driver: {
        name: "Michael Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
      },
      pickup: "Chinatown",
      destination: "Midtown East",
      departureTime: "7:15 PM Today",
      availableSeats: 3,
      distance: "3.5 miles",
      price: 17.25,
      eta: "15 min",
      withFoodStop: true,
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
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              <h1 className="text-2xl font-bold text-night-800">Ride Sharing</h1>
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
          
          {/* Ride Search Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-night-800 mb-4">Find a Ride</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="pickup" className="text-sm font-medium text-night-700">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                    <Input 
                      id="pickup"
                      placeholder="Enter pickup location"
                      className="pl-9"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium text-night-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                    <Input 
                      id="destination"
                      placeholder="Enter destination"
                      className="pl-9"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="departure" className="text-sm font-medium text-night-700">Departure Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                    <Input 
                      id="departure"
                      type="time"
                      className="pl-9"
                      defaultValue="18:00"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="passengers" className="text-sm font-medium text-night-700">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                    <Input 
                      id="passengers"
                      type="number"
                      min="1"
                      max="4"
                      className="pl-9"
                      defaultValue="1"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">
                    Find Rides
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="with-food"
                  className="rounded border-gray-300 text-urban-600 shadow-sm focus:border-urban-300 focus:ring focus:ring-urban-200 focus:ring-opacity-50 h-4 w-4"
                  checked={isSharingEnabled}
                  onChange={() => setIsSharingEnabled(!isSharingEnabled)}
                />
                <label htmlFor="with-food" className="ml-2 text-sm text-night-700">
                  {isSharingEnabled 
                    ? "Share your ride with others to save money" 
                    : "Add a food stop on your ride"}
                </label>
              </div>
            </div>
          </div>
          
          {/* Available Rides */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-night-800">Available Rides</h2>
              
              <div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Sort by Time</span>
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Rides</TabsTrigger>
                <TabsTrigger value="food">With Food Stop</TabsTrigger>
                <TabsTrigger value="shared">Shared Rides</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableRides.map((ride, index) => (
                    <RideCard 
                      key={index}
                      {...ride}
                      onRequestRide={() => handleRequestRide(ride)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="food" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableRides
                    .filter(ride => ride.withFoodStop)
                    .map((ride, index) => (
                      <RideCard 
                        key={index}
                        {...ride}
                        onRequestRide={() => handleRequestRide(ride)}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="shared" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableRides
                    .filter(ride => ride.availableSeats >= 2)
                    .map((ride, index) => (
                      <RideCard 
                        key={index}
                        {...ride}
                        onRequestRide={() => handleRequestRide(ride)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Footer with Founder Info */}
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
      </footer>
      
      {/* Modals */}
      <LocationSearch 
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default RideShare;
