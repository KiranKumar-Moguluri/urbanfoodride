
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { LocationSearch } from "@/components/LocationSearch";
import { useToast } from "@/hooks/use-toast";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { useRideRequest } from "@/hooks/useRideRequest";
import { getFilteredRestaurants, getRestaurantById } from "@/data/restaurantData";
import { Restaurant, FoodItem } from "@/types/food-order.types";

// Import components
import { SearchBar } from "@/components/food-order/SearchBar";
import { RideRequestToggle } from "@/components/food-order/RideRequestToggle";
import { ActiveRideRequest } from "@/components/food-order/ActiveRideRequest";
import { RestaurantMenuSheet } from "@/components/food-order/RestaurantMenuSheet";
import { RideRequestSheet } from "@/components/food-order/RideRequestSheet";
import { CartSummary } from "@/components/food-order/CartSummary";
import { RestaurantTabs } from "@/components/food-order/RestaurantTabs";
import { PageHeader } from "@/components/food-order/PageHeader";

const FoodOrderContent = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [deliveryLocation, setDeliveryLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showMenuSheet, setShowMenuSheet] = useState(false);
  const [showOfferRideSheet, setShowOfferRideSheet] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, addToCart, removeFromCart } = useCart();
  const {
    rideRequest,
    handlePickupLocationSelect,
    toggleNeedRide,
    resetRideRequest,
    setRideTime,
    setRideCapacity
  } = useRideRequest();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get("restaurant");
    if (restaurantId) {
      const restaurant = getRestaurantById(restaurantId);
      setSelectedRestaurant(restaurant || null);
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
  };

  const openRestaurantMenu = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenuSheet(true);
  };

  const handleAddToCart = (item: FoodItem) => {
    if (!selectedRestaurant) return;
    addToCart(item, selectedRestaurant);
  };

  const handleRideToggle = (checked: boolean) => {
    toggleNeedRide(checked);
    
    if (checked) {
      setShowOfferRideSheet(true);
    }
  };

  const handleOfferRide = () => {
    setShowOfferRideSheet(false);
    
    toast({
      title: "Ride Request Added",
      description: `Your ride request has been added to your order${rideRequest.rideDiscount > 0 ? ` with a ${rideRequest.rideDiscount}% discount` : ''}`,
    });
  };

  const handleCheckout = () => {
    if (rideRequest.needRide) {
      navigate(`/checkout?needRide=true&pickupLocation=${encodeURIComponent(rideRequest.pickupLocation)}&discount=${rideRequest.rideDiscount}&pickupTime=${rideRequest.rideTime}`);
    } else {
      navigate('/checkout');
    }
  };

  const filteredRestaurants = getFilteredRestaurants(searchQuery);

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
          <PageHeader 
            currentLocation={currentLocation}
            onBackClick={() => navigate(-1)}
            onLocationClick={() => setLocationModalOpen(true)}
          />
          
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <RideRequestToggle 
            needRide={rideRequest.needRide}
            onRideToggle={handleRideToggle}
          />
          
          {rideRequest.needRide && (
            <ActiveRideRequest 
              rideRequest={rideRequest}
              onSetPickupLocation={() => setShowOfferRideSheet(true)}
              onCancelRide={resetRideRequest}
            />
          )}
          
          <RestaurantTabs 
            restaurants={filteredRestaurants}
            onRestaurantSelect={openRestaurantMenu}
          />
          
          <CartSummary 
            cart={cart}
            needRide={rideRequest.needRide}
            rideDiscount={rideRequest.rideDiscount}
            onCheckout={handleCheckout}
          />
          
          <RestaurantMenuSheet 
            open={showMenuSheet}
            onOpenChange={setShowMenuSheet}
            restaurant={selectedRestaurant}
            cartItems={selectedRestaurant 
              ? cart.items.filter(item => item.restaurantId === selectedRestaurant.id)
              : []}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={removeFromCart}
          />
          
          <RideRequestSheet 
            open={showOfferRideSheet}
            onOpenChange={setShowOfferRideSheet}
            rideRequest={rideRequest}
            onPickupLocationChange={(loc) => handlePickupLocationSelect(loc, deliveryLocation)}
            onPickupLocationSelect={(loc) => handlePickupLocationSelect(loc, deliveryLocation)}
            onTimeChange={setRideTime}
            onCapacityChange={setRideCapacity}
            onConfirm={handleOfferRide}
          />
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

const FoodOrder = () => {
  return (
    <CartProvider>
      <FoodOrderContent />
    </CartProvider>
  );
};

export default FoodOrder;
