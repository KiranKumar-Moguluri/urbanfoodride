
import { Car } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface RideRequestToggleProps {
  needRide: boolean;
  onRideToggle: (checked: boolean) => void;
}

export function RideRequestToggle({ needRide, onRideToggle }: RideRequestToggleProps) {
  return (
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
          onCheckedChange={onRideToggle}
          className="data-[state=checked]:bg-urban-600"
        />
      </div>
    </div>
  );
}
