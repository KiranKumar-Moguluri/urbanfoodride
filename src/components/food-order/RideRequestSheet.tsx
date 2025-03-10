
import { MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { RideRequest } from "@/types/food-order.types";

interface RideRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideRequest: RideRequest;
  onPickupLocationChange: (location: string) => void;
  onTimeChange: (time: string) => void;
  onCapacityChange: (capacity: number) => void;
  onPickupLocationSelect: (location: string) => void;
  onConfirm: () => void;
}

export function RideRequestSheet({
  open,
  onOpenChange,
  rideRequest,
  onPickupLocationChange,
  onTimeChange,
  onCapacityChange,
  onPickupLocationSelect,
  onConfirm
}: RideRequestSheetProps) {
  const { pickupLocation, pickupDistance, rideTime, rideCapacity, rideDiscount } = rideRequest;

  const handleExampleLocation = () => {
    const exampleLocations = [
      "123 Main St, New York, NY",
      "500 5th Ave, New York, NY 10110",
      "350 6th Ave, New York, NY 10118",
      "1 World Trade Center, New York, NY"
    ];
    const randomLocation = exampleLocations[Math.floor(Math.random() * exampleLocations.length)];
    onPickupLocationSelect(randomLocation);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-urban-600" />
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
                  onChange={(e) => onPickupLocationChange(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1"
                onClick={handleExampleLocation}
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
                  onChange={(e) => onTimeChange(e.target.value)}
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
                  onChange={(e) => onCapacityChange(parseInt(e.target.value))}
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
              onClick={onConfirm}
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
  );
}
