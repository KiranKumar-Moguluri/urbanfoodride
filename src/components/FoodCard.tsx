
import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    distance: string;
    priceRange: string;
    featured?: boolean;
  };
  variant?: "small" | "large";
  className?: string;
  onClick?: () => void;
}

export function FoodCard({
  restaurant,
  variant = "large",
  className,
  onClick,
}: FoodCardProps) {
  const isSmall = variant === "small";
  
  return (
    <div 
      className={cn(
        "bg-white rounded-xl border shadow-sm overflow-hidden card-hover",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className={cn(
          "bg-gradient-to-t from-black/40 to-transparent absolute bottom-0 left-0 right-0",
          isSmall ? "h-12" : "h-16"
        )}></div>
        
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className={cn(
            "w-full object-cover",
            isSmall ? "h-28" : "h-40"
          )}
        />
        
        {restaurant.featured && (
          <Badge className="absolute top-2 left-2 bg-urban-500/90 hover:bg-urban-500">
            Featured
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <Badge variant="outline" className="bg-white/90 text-night-800 hover:bg-white">
            {restaurant.cuisine}
          </Badge>
          
          <Badge variant="outline" className="bg-white/90 text-night-800 hover:bg-white">
            {restaurant.priceRange}
          </Badge>
        </div>
      </div>
      
      <div className={cn(
        "p-4",
        isSmall ? "pt-3" : "pt-4"
      )}>
        <h3 className={cn(
          "font-semibold text-night-800 truncate",
          isSmall ? "text-sm" : "text-base"
        )}>
          {restaurant.name}
        </h3>
        
        <div className="flex items-center mt-1 gap-4">
          <div className="flex items-center">
            <Star className="w-3.5 h-3.5 text-amber-500 mr-1" />
            <span className={cn(
              "font-medium",
              isSmall ? "text-xs" : "text-sm"
            )}>
              {restaurant.rating}
            </span>
          </div>
          
          <div className="flex items-center text-night-600">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span className={cn(
              isSmall ? "text-xs" : "text-sm"
            )}>
              {restaurant.deliveryTime}
            </span>
          </div>
          
          <div className="flex items-center text-night-600">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span className={cn(
              isSmall ? "text-xs" : "text-sm"
            )}>
              {restaurant.distance}
            </span>
          </div>
        </div>
        
        {!isSmall && (
          <Button className="w-full mt-3" onClick={onClick}>
            Order Food
          </Button>
        )}
      </div>
    </div>
  );
}
