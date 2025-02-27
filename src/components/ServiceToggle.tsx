
import { useState, useEffect } from "react";
import { Car, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceToggleProps {
  value: "food" | "ride";
  onChange: (value: "food" | "ride") => void;
  className?: string;
}

export function ServiceToggle({ value, onChange, className }: ServiceToggleProps) {
  const [activeTab, setActiveTab] = useState<"food" | "ride">(value);
  
  useEffect(() => {
    setActiveTab(value);
  }, [value]);
  
  const handleTabChange = (tab: "food" | "ride") => {
    setActiveTab(tab);
    onChange(tab);
  };
  
  return (
    <div className={cn("flex rounded-full p-1 bg-white shadow-sm border", className)}>
      <button
        type="button"
        onClick={() => handleTabChange("food")}
        className={cn(
          "flex items-center justify-center gap-2 rounded-full py-2 px-4 text-sm transition-all duration-300 flex-1 font-medium",
          activeTab === "food" 
            ? "bg-urban-500 text-white shadow-sm" 
            : "text-night-600 hover:bg-gray-100"
        )}
      >
        <Utensils className={cn(
          "h-4 w-4 transition-all",
          activeTab === "food" ? "opacity-100" : "opacity-70"
        )} />
        <span>Food</span>
      </button>
      
      <button
        type="button"
        onClick={() => handleTabChange("ride")}
        className={cn(
          "flex items-center justify-center gap-2 rounded-full py-2 px-4 text-sm transition-all duration-300 flex-1 font-medium",
          activeTab === "ride" 
            ? "bg-urban-500 text-white shadow-sm" 
            : "text-night-600 hover:bg-gray-100"
        )}
      >
        <Car className={cn(
          "h-4 w-4 transition-all",
          activeTab === "ride" ? "opacity-100" : "opacity-70"
        )} />
        <span>Ride</span>
      </button>
    </div>
  );
}
