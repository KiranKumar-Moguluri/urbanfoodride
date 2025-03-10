
import { MapPin, Clock, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RideRequest } from "@/types/food-order.types";

interface ActiveRideRequestProps {
  rideRequest: RideRequest;
  onSetPickupLocation: () => void;
  onCancelRide: () => void;
}

export function ActiveRideRequest({ 
  rideRequest, 
  onSetPickupLocation, 
  onCancelRide 
}: ActiveRideRequestProps) {
  const { pickupLocation, rideTime, rideDiscount } = rideRequest;
  
  return (
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
                  onClick={onSetPickupLocation}
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
          onClick={onCancelRide}
        >
          Cancel Ride
        </Button>
      </div>
    </div>
  );
}
