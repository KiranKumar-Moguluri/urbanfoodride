
import { useState } from "react";
import { RideRequest } from "@/types/food-order.types";
import { useToast } from "@/hooks/use-toast";

export function useRideRequest() {
  const [rideRequest, setRideRequest] = useState<RideRequest>({
    needRide: false,
    pickupLocation: "",
    pickupDistance: 0,
    rideTime: "18:00",
    rideCapacity: 1,
    rideDiscount: 0
  });
  const { toast } = useToast();

  const calculateRideDiscount = (deliveryLocation: string, pickupLocation: string) => {
    // This simulates calculating the distance between two locations
    // In a real app, you would use a mapping service API
    const distance = Math.random() * 5;
    const roundedDistance = parseFloat(distance.toFixed(1));
    
    let discount = 0;
    if (distance < 1) {
      discount = 100;
    } else if (distance < 2) {
      discount = 75;
    } else if (distance < 3) {
      discount = 50;
    } else if (distance < 4) {
      discount = 25;
    }
    
    setRideRequest(prev => ({
      ...prev,
      pickupDistance: roundedDistance,
      rideDiscount: discount
    }));
    
    return { distance: roundedDistance, discount };
  };

  const handlePickupLocationSelect = (location: string, deliveryLocation: string) => {
    setRideRequest(prev => ({
      ...prev,
      pickupLocation: location
    }));
    
    calculateRideDiscount(deliveryLocation, location);
    
    toast({
      title: "Pickup location updated",
      description: location,
    });
  };

  const setRideTime = (time: string) => {
    setRideRequest(prev => ({
      ...prev,
      rideTime: time
    }));
  };

  const setRideCapacity = (capacity: number) => {
    setRideRequest(prev => ({
      ...prev,
      rideCapacity: capacity
    }));
  };

  const toggleNeedRide = (needRide: boolean) => {
    setRideRequest(prev => ({
      ...prev,
      needRide
    }));
  };

  const resetRideRequest = () => {
    setRideRequest({
      needRide: false,
      pickupLocation: "",
      pickupDistance: 0,
      rideTime: "18:00",
      rideCapacity: 1,
      rideDiscount: 0
    });
    
    toast({
      title: "Ride Request Canceled",
      description: "You're no longer requesting a ride with your order",
    });
  };

  return {
    rideRequest,
    calculateRideDiscount,
    handlePickupLocationSelect,
    setRideTime,
    setRideCapacity,
    toggleNeedRide,
    resetRideRequest
  };
}
