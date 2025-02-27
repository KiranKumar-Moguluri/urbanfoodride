
import { useState } from "react";
import { MapPin, Compass, X, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: string) => void;
}

const popularLocations = [
  "Current Location",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Seattle, WA",
];

export function LocationSearch({ open, onOpenChange, onLocationSelect }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentLocations, setRecentLocations] = useState<string[]>([
    "123 Main St, Anytown, USA",
    "456 Market St, San Francisco, CA",
  ]);
  const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);
  const { toast } = useToast();
  
  const filteredLocations = popularLocations.filter(location => 
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecentLocations = recentLocations.filter(location => 
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectLocation = (location: string) => {
    if (location === "Current Location") {
      setGettingCurrentLocation(true);
      // Simulate getting current location
      setTimeout(() => {
        const mockCurrentLocation = "350 5th Ave, New York, NY 10118";
        onLocationSelect(mockCurrentLocation);
        onOpenChange(false);
        toast({
          title: "Location detected",
          description: mockCurrentLocation,
        });
        setGettingCurrentLocation(false);
      }, 1500);
    } else {
      if (!recentLocations.includes(location) && location !== "Current Location") {
        setRecentLocations(prev => [location, ...prev].slice(0, 5));
      }
      onLocationSelect(location);
      onOpenChange(false);
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSelectLocation(searchTerm);
    }
  };
  
  const clearRecentLocation = (location: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentLocations(prev => prev.filter(loc => loc !== location));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-night-800">
            Find a Location
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearchSubmit} className="mt-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-night-400" />
            <Input 
              placeholder="Search for a location..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        
        <div className="mt-6 space-y-6">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 h-auto py-3"
            onClick={() => handleSelectLocation("Current Location")}
            disabled={gettingCurrentLocation}
          >
            {gettingCurrentLocation ? (
              <>
                <div className="animate-pulse h-5 w-5 rounded-full bg-urban-300"></div>
                <span>Detecting your location...</span>
              </>
            ) : (
              <>
                <Compass className="h-5 w-5 text-urban-500" />
                <span>Use current location</span>
              </>
            )}
          </Button>
          
          {filteredRecentLocations.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-night-500">Recent Locations</h3>
              <div className="space-y-1">
                {filteredRecentLocations.map((location) => (
                  <div 
                    key={location}
                    className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-night-400" />
                      <span className="text-night-700">{location}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-night-400"
                      onClick={(e) => clearRecentLocation(location, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {filteredLocations.length > 0 && filteredLocations[0] !== "Current Location" && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-night-500">Popular Cities</h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredLocations.filter(loc => loc !== "Current Location").map((location) => (
                  <Button 
                    key={location}
                    variant="outline" 
                    className="justify-start h-auto py-2"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <span>{location}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
