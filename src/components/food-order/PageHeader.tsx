
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationDisplay } from "./LocationDisplay";

interface PageHeaderProps {
  currentLocation: string;
  onBackClick: () => void;
  onLocationClick: () => void;
}

export function PageHeader({ currentLocation, onBackClick, onLocationClick }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={onBackClick}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-night-800">Food Ordering</h1>
      </div>
      
      <div className="mt-4 md:mt-0">
        <LocationDisplay 
          location={currentLocation} 
          onChangeLocation={onLocationClick} 
        />
      </div>
    </div>
  );
}
