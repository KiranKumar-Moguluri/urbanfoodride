import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter, MapPin, ShoppingBag, Car, Users, Clock, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { FoodCard } from "@/components/FoodCard";
import { LocationSearch } from "@/components/LocationSearch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
  featured?: boolean;
  menuItems?: FoodItem[];
}

interface CartItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
}

const FoodOrder = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [deliveryLocation, setDeliveryLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showMenuSheet, setShowMenuSheet] = useState(false);
  const [cart, setCart] = useState<{ items: CartItem[], total: number }>({ items: [], total: 0 });
  const [offerRideEnabled, setOfferRideEnabled] = useState(false);
  const [showOfferRideSheet, setShowOfferRideSheet] = useState(false);
  const [rideCapacity, setRideCapacity] = useState(1);
  const [rideTime, setRideTime] = useState("18:00");
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [pickupDistance, setPickupDistance] = useState(0);
  const [rideDiscount, setRideDiscount] = useState(0);
  const [needRide, setNeedRide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get("restaurant");
    if (restaurantId) {
      const restaurant = restaurants.find(r => r.id === restaurantId) || null;
      setSelectedRestaurant(restaurant);
      if (restaurant) {
        setShowMenuSheet(true);
      }
    }
  }, [location]);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    setDeliveryLocation(location);
    toast({
      title: "Location updated",
      description: location,
    });
    
    if (needRide && pickupLocation) {
      calculateRideDiscount(location, pickupLocation);
    }
  };

  const handlePickupLocationSelect = (location: string) => {
    setPickupLocation(location);
    
    calculateRideDiscount(deliveryLocation, location);
    
    toast({
      title: "Pickup location updated",
      description: location,
    });
  };

  const calculateRideDiscount = (deliveryLocation: string, pickupLocation: string) => {
    const distance = Math.random() * 5;
    setPickupDistance(parseFloat(distance.toFixed(1)));
    
    if (distance < 1) {
      setRideDiscount(100);
    } else if (distance < 2) {
      setRideDiscount(75);
    } else if (distance < 3) {
      setRideDiscount(50);
    } else if (distance < 4) {
      setRideDiscount(25);
    } else {
      setRideDiscount(0);
    }
  };

  const openRestaurantMenu = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuSheet(true);
  };

  const handleAddToCart = (item: FoodItem) => {
    if (!selectedRestaurant) return;
    
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === item.id && cartItem.restaurantId === selectedRestaurant.id
    );
    
    let newItems = [...cart.items];
    let newTotal = cart.total;
    
    if (existingItemIndex >= 0) {
      newItems[existingItemIndex].quantity += 1;
      newTotal += item.price;
    } else {
      newItems.push({
        id: item.id,
        restaurantId: selectedRestaurant.id,
        restaurantName: selectedRestaurant.name,
        restaurantImage: selectedRestaurant.image,
        itemName: item.name,
        itemPrice: item.price,
        quantity: 1
      });
      newTotal += item.price;
    }
    
    setCart({
      items: newItems,
      total: newTotal
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} from ${selectedRestaurant.name} added to your cart`,
    });
  };

  const handleRemoveFromCart = (itemId: string, restaurantId: string) => {
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === itemId && cartItem.restaurantId === restaurantId
    );
    
    if (existingItemIndex < 0) return;
    
    const item = cart.items[existingItemIndex];
    let newItems = [...cart.items];
    let newTotal = cart.total;
    
    if (item.quantity > 1) {
      newItems[existingItemIndex].quantity -= 1;
      newTotal -= item.itemPrice;
    } else {
      newItems = newItems.filter((_, index) => index !== existingItemIndex);
      newTotal -= item.itemPrice;
    }
    
    setCart({
      items: newItems,
      total: newTotal
    });
  };

  const handleRideToggle = (checked: boolean) => {
    setNeedRide(checked);
    
    if (checked) {
      setShowOfferRideSheet(true);
    } else {
      setOfferRideEnabled(false);
    }
  };

  const handleOfferRide = () => {
    setShowOfferRideSheet(false);
    
    setOfferRideEnabled(true);
    
    toast({
      title: "Ride Request Added",
      description: `Your ride request has been added to your order${rideDiscount > 0 ? ` with a ${rideDiscount}% discount` : ''}`,
    });
  };

  const handleCheckout = () => {
    if (needRide) {
      navigate(`/checkout?needRide=true&pickupLocation=${encodeURIComponent(pickupLocation)}&discount=${rideDiscount}&pickupTime=${rideTime}`);
    } else {
      navigate('/checkout');
    }
  };

  const restaurants: Restaurant[] = [
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
      menuItems: [
        {
          id: "1-1",
          name: "Signature Burger",
          price: 15.99,
          description: "Prime beef patty with caramelized onions, cheddar cheese, and house sauce"
        },
        {
          id: "1-2",
          name: "Truffle Fries",
          price: 8.99,
          description: "Hand-cut potatoes fried to perfection, tossed with truffle oil and parmesan"
        },
        {
          id: "1-3",
          name: "Cobb Salad",
          price: 12.99,
          description: "Fresh greens with grilled chicken, bacon, avocado, eggs, and blue cheese"
        }
      ]
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
      menuItems: [
        {
          id: "2-1",
          name: "Rainbow Roll",
          price: 18.99,
          description: "Crab, cucumber, and avocado roll topped with assorted sashimi"
        },
        {
          id: "2-2",
          name: "Spicy Tuna Roll",
          price: 14.99,
          description: "Fresh tuna mixed with spicy mayo and cucumber"
        },
        {
          id: "2-3",
          name: "Miso Soup",
          price: 4.99,
          description: "Traditional Japanese soup with tofu, seaweed, and green onions"
        }
      ]
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
      menuItems: [
        {
          id: "3-1",
          name: "Taco Salad",
          price: 10.99,
          description: "Grilled chicken, lettuce, tomato, and cheese"
        },
        {
          id: "3-2",
          name: "Chalupa",
          price: 8.99,
          description: "Soft taco shell filled with ground beef, cheese, and salsa"
        },
        {
          id: "3-3",
          name: "Burrito",
          price: 12.99,
          description: "Soft flour tortilla filled with ground beef, cheese, beans, and salsa"
        }
      ]
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
      menuItems: [
        {
          id: "4-1",
          name: "Margherita Pizza",
          price: 12.99,
          description: "Tomato sauce, mozzarella cheese, and fresh basil"
        },
        {
          id: "4-2",
          name: "Penne Alfredo",
          price: 15.99,
          description: "Penne pasta tossed with Alfredo sauce, garlic, and parmesan"
        },
        {
          id: "4-3",
          name: "Lasagna",
          price: 18.99,
          description: "Layers of pasta, meat sauce, and mozzarella cheese"
        }
      ]
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
      menuItems: [
        {
          id: "5-1",
          name: "Pad Thai",
          price: 10.99,
          description: "Noodles stir-fried with tofu, shrimp, and vegetables"
        },
        {
          id: "5-2",
          name: "Gyoza",
          price: 7.99,
          description: "Flaky dumplings filled with pork and vegetables"
        },
        {
          id: "5-3",
          name: "Ramen",
          price: 12.99,
          description: "Japanese noodle soup with pork broth and toppings"
        }
      ]
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
      menuItems: [
        {
          id: "6-1",
          name: "Cheeseburger",
          price: 10.99,
          description: "Bun with beef patty, cheese, lettuce, tomato, and pickles"
        },
        {
          id: "6-2",
          name: "Fries",
          price: 5.99,
          description: "Hand-cut fries with ketchup and mayonnaise"
        },
        {
          id: "6-3",
          name: "Onion Rings",
          price: 3.99,
          description: "Crispy onion rings with ranch dressing"
        }
      ]
    }
  ];

  restaurants.forEach(restaurant => {
    if (!restaurant.menuItems) {
      restaurant.menuItems = [
        {
          id: `${restaurant.id}-1`,
          name: `${restaurant.name} Special`,
          price: 15.99,
          description: `Signature dish from ${restaurant.name}`
        },
        {
          id: `${restaurant.id}-2`,
          name: `${restaurant.cuisine} Classic`,
          price: 12.99,
          description: `Traditional ${restaurant.cuisine} favorite`
        },
        {
          id: `${restaurant.id}-3`,
          name: "Side Dish",
          price: 7.99,
          description: "Perfect complement to your meal"
        }
      ];
    }
  });

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
          
          <div className="bg-urban-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-urban-100 rounded-full flex items-center justify-center">
                <Car className="h-5 w-5 text-urban-600" />
              </div>
              <div>
                <h3 className="font-medium text-night-800">Need a ride with your food?</h3>
                <p className="text-sm text-night-600">Save money by adding a ride that's on the same route as your food delivery</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-night-600">Add ride</span>
              <Checkbox 
                checked={needRide} 
                onCheckedChange={handleRideToggle}
                className="data-[state=checked]:bg-urban-600"
              />
            </div>
          </div>
          
          {needRide && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-night-800">Ride Request Active</h3>
                    <div className="text-sm text-night-600 mt-1">
                      {pickupLocation ? (
                        <>
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-3 w-3" />
                            <span>Pickup: {pickupLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Time: {rideTime}</span>
                          </div>
                          {rideDiscount > 0 && (
                            <Badge className="mt-2 bg-green-600">
                              {rideDiscount}% Discount
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1"
                          onClick={() => setShowOfferRideSheet(true)}
                        >
                          Set pickup location
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  onClick={() => {
                    setNeedRide(false);
                    setOfferRideEnabled(false);
                    setPickupLocation("");
                    setRideDiscount(0);
                    toast({
                      title: "Ride Request Canceled",
                      description: "You're no longer requesting a ride with your order",
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
                    onClick={() => openRestaurantMenu(restaurant)}
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
                      onClick={() => openRestaurantMenu(restaurant)}
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
                      onClick={() => openRestaurantMenu(restaurant)}
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
                      onClick={() => openRestaurantMenu(restaurant)}
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
                    {needRide && (
                      <span className="text-xs bg-green-200 text-green-800 py-0.5 px-2 rounded-full">
                        + Ride {rideDiscount > 0 ? `(${rideDiscount}% off)` : ''}
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
          
          <Sheet open={showMenuSheet} onOpenChange={setShowMenuSheet}>
            <SheetContent className="w-full sm:max-w-lg p-0">
              {selectedRestaurant && (
                <div className="h-full flex flex-col">
                  <div className="relative h-48 w-full bg-night-100">
                    <img 
                      src={selectedRestaurant.image} 
                      alt={selectedRestaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full"
                      onClick={() => setShowMenuSheet(false)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-6">
                    <h2 className="text-2xl font-bold mb-1">{selectedRestaurant.name}</h2>
                    <div className="flex items-center gap-2 text-night-600 text-sm mb-6">
                      <span>{selectedRestaurant.cuisine}</span>
                      <span>•</span>
                      <span>{selectedRestaurant.rating} ★</span>
                      <span>•</span>
                      <span>{selectedRestaurant.deliveryTime}</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-4">Menu</h3>
                    
                    <div className="space-y-6">
                      {selectedRestaurant.menuItems?.map((item) => (
                        <div key={item.id} className="flex justify-between border-b pb-4">
                          <div className="flex-1 pr-4">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-night-600 mt-1">{item.description}</p>
                            <p className="text-sm font-medium mt-2">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 rounded-full"
                              onClick={() => handleAddToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {cart.items.filter(item => item.restaurantId === selectedRestaurant.id).length > 0 && (
                    <div className="p-4 border-t bg-white">
                      <h3 className="font-medium mb-3">Items in Cart</h3>
                      <div className="space-y-3">
                        {cart.items
                          .filter(item => item.restaurantId === selectedRestaurant.id)
                          .map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-night-600">{item.quantity}x</span>
                                <span>{item.itemName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>${(item.itemPrice * item.quantity).toFixed(2)}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-6 w-6 rounded-full p-0" 
                                  onClick={() => handleRemoveFromCart(item.id, item.restaurantId)}
                                >
                                  <span className="sr-only">Remove</span>
                                  <span className="text-red-500">-</span>
                                </Button>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SheetContent>
          </Sheet>
          
          <Sheet open={showOfferRideSheet} onOpenChange={setShowOfferRideSheet}>
            <SheetContent>
              <div className="space-y-6 pt-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-urban-600" />
                  Request a Ride
                </h2>
                
                <p className="text-night-600">
                  Set your pickup location and time to request a ride with your food order. If your location is on the same route as the food delivery, you'll get a discount!
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <label htmlFor="pickup-location" className="text-sm font-medium text-night-700">Pickup Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                      <Input 
                        id="pickup-location"
                        placeholder="Enter your pickup address"
                        className="pl-9"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1"
                      onClick={() => {
                        const exampleLocations = [
                          "123 Main St, New York, NY",
                          "500 5th Ave, New York, NY 10110",
                          "350 6th Ave, New York, NY 10118",
                          "1 World Trade Center, New York, NY"
                        ];
                        const randomLocation = exampleLocations[Math.floor(Math.random() * exampleLocations.length)];
                        handlePickupLocationSelect(randomLocation);
                      }}
                    >
                      Use Example Location
                    </Button>
                  </div>
                  
                  {pickupLocation && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-night-700">Distance from delivery route</label>
                        <span className="text-sm font-medium">{pickupDistance} miles</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-yellow-500" 
                          style={{ 
                            width: `${Math.min(100, (pickupDistance / 5) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-night-500">
                        <span>On route (free)</span>
                        <span>Far from route (full price)</span>
                      </div>
                    </div>
                  )}
                  
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
                </div>
                
                {pickupLocation && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ride Discount:</span>
                      <span className="font-bold text-green-700">{rideDiscount}%</span>
                    </div>
                    <p className="text-sm text-night-600 mt-2">
                      {rideDiscount === 100 
                        ? "Your pickup location is directly on the delivery route. Your ride will be free!" 
                        : rideDiscount > 0 
                          ? `Your pickup location is near the delivery route. You'll get a ${rideDiscount}% discount.`
                          : "Your pickup location is not on the delivery route. Standard pricing applies."}
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3 mt-8">
                  <Button 
                    className="flex-1" 
                    onClick={handleOfferRide}
                    disabled={!pickupLocation}
                  >
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
