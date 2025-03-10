
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationDisplayProps {
  location: string;
  onChangeLocation: () => void;
}

export function LocationDisplay({ location, onChangeLocation }: LocationDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-night-600 text-sm">
        <MapPin className="h-4 w-4" />
        <span className="line-clamp-1 max-w-[200px]">{location}</span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-shrink-0"
        onClick={onChangeLocation}
      >
        Change
      </Button>
    </div>
  );
}
