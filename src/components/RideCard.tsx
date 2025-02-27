
import { MapPin, Clock, Users, Compass, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

interface RideCardProps {
  driver: {
    name: string;
    avatar?: string;
    rating: number;
  };
  pickup: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  distance: string;
  price: number;
  eta: string;
  variant?: "small" | "large";
  className?: string;
  onRequestRide?: () => void;
  withFoodStop?: boolean;
}

export function RideCard({
  driver,
  pickup,
  destination,
  departureTime,
  availableSeats,
  distance,
  price,
  eta,
  variant = "large",
  className,
  onRequestRide,
  withFoodStop = false,
}: RideCardProps) {
  const isSmall = variant === "small";
  
  return (
    <div 
      className={cn(
        "bg-white rounded-xl border shadow-sm overflow-hidden card-hover",
        isSmall ? "p-4" : "p-5",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserAvatar 
            name={driver.name}
            src={driver.avatar}
            size={isSmall ? "sm" : "md"}
          />
          <div>
            <h3 className={cn(
              "font-medium text-night-800",
              isSmall ? "text-sm" : "text-base"
            )}>
              {driver.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(driver.rating) ? "text-amber-500" : "text-gray-300"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className={cn(
                "text-night-700",
                isSmall ? "text-xs" : "text-sm"
              )}>
                {driver.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className={cn(
            "font-bold text-night-800",
            isSmall ? "text-lg" : "text-xl"
          )}>
            ${price.toFixed(2)}
          </div>
          <div className="text-xs text-night-500 font-medium">
            {distance}
          </div>
        </div>
      </div>
      
      <div className={cn(
        "flex",
        isSmall ? "gap-3" : "gap-4"
      )}>
        <div className="flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-urban-500 ring-4 ring-urban-50"></div>
          <div className="w-0.5 h-full bg-dashed border-l border-dashed border-urban-200 my-1"></div>
          {withFoodStop && (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-50"></div>
              <div className="w-0.5 h-full bg-dashed border-l border-dashed border-urban-200 my-1"></div>
            </>
          )}
          <div className="w-2.5 h-2.5 rounded-full bg-night-700 ring-4 ring-night-50"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <div className="text-xs font-medium text-urban-600 mb-1">PICKUP</div>
            <div className={cn(
              "text-night-800 font-medium truncate",
              isSmall ? "text-sm" : "text-base"
            )}>
              {pickup}
            </div>
          </div>
          
          {withFoodStop && (
            <div className="mb-3">
              <div className="text-xs font-medium text-amber-600 mb-1">FOOD STOP</div>
              <div className={cn(
                "text-night-800 font-medium truncate",
                isSmall ? "text-sm" : "text-base"
              )}>
                Delicious Restaurant
              </div>
            </div>
          )}
          
          <div>
            <div className="text-xs font-medium text-night-600 mb-1">DESTINATION</div>
            <div className={cn(
              "text-night-800 font-medium truncate",
              isSmall ? "text-sm" : "text-base"
            )}>
              {destination}
            </div>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "grid grid-cols-3 gap-2 mt-4 pt-4 border-t",
        isSmall ? "text-xs" : "text-sm"
      )}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-night-500 mb-0.5">
            <Clock className="h-3 w-3" />
            <span>Departure</span>
          </div>
          <div className="font-medium text-night-800">{departureTime}</div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-night-500 mb-0.5">
            <Users className="h-3 w-3" />
            <span>Seats</span>
          </div>
          <div className="font-medium text-night-800">{availableSeats} available</div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-night-500 mb-0.5">
            <Compass className="h-3 w-3" />
            <span>ETA</span>
          </div>
          <div className="font-medium text-night-800">{eta}</div>
        </div>
      </div>
      
      {!isSmall && (
        <Button 
          className="w-full mt-4" 
          onClick={onRequestRide}
        >
          Request Ride
        </Button>
      )}
    </div>
  );
}
