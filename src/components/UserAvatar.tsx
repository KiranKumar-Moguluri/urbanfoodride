
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  status?: "online" | "offline" | "away";
}

export function UserAvatar({ 
  src, 
  name, 
  size = "md", 
  className,
  status
}: UserAvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8 text-xs";
      case "lg":
        return "h-12 w-12 text-lg";
      default:
        return "h-10 w-10 text-sm";
    }
  };

  return (
    <div className="relative">
      <Avatar className={cn(getSizeClass(), "ring-2 ring-background", className)}>
        <AvatarImage 
          src={src} 
          alt={name} 
          className={cn(
            "object-cover transition-opacity duration-300", 
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        <AvatarFallback className="bg-urban-100 text-urban-700 font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background h-2.5 w-2.5", 
            status === "online" && "bg-green-500",
            status === "offline" && "bg-gray-400",
            status === "away" && "bg-amber-500"
          )}
        />
      )}
    </div>
  );
}
