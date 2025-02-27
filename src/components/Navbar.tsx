
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, HelpCircle, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLoggedIn?: boolean;
  onLoginClick: () => void;
  onLocationClick: () => void;
  userName?: string;
  userAvatar?: string;
}

export function Navbar({ 
  isLoggedIn = false, 
  onLoginClick, 
  onLocationClick,
  userName = "Guest User",
  userAvatar
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-4 md:px-8",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-urban-700 flex items-center space-x-2"
        >
          <div className="h-8 w-8 rounded-lg bg-urban-500 text-white flex items-center justify-center font-bold">
            UX
          </div>
          <span className="hidden md:inline-block">UrbanDashX</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            <Link 
              to="/dashboard" 
              className={cn(
                "text-night-700 hover:text-urban-600 transition-colors font-medium",
                isActive("/dashboard") && "text-urban-600"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/ride-share" 
              className={cn(
                "text-night-700 hover:text-urban-600 transition-colors font-medium",
                isActive("/ride-share") && "text-urban-600"
              )}
            >
              Find Ride
            </Link>
            <Link 
              to="/food-order" 
              className={cn(
                "text-night-700 hover:text-urban-600 transition-colors font-medium",
                isActive("/food-order") && "text-urban-600"
              )}
            >
              Order Food
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-urban-200 text-night-700"
              onClick={onLocationClick}
            >
              <MapPin className="h-4 w-4 text-urban-500" />
              <span>Find Location</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-night-700"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/help">
              <Button variant="ghost" size="icon" className="text-night-700">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </Link>
            
            {isLoggedIn ? (
              <Link to="/profile">
                <UserAvatar src={userAvatar} name={userName} status="online" />
              </Link>
            ) : (
              <Button onClick={onLoginClick}>
                Sign In
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="flex md:hidden items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-night-700"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isLoggedIn ? (
            <Link to="/profile">
              <UserAvatar src={userAvatar} name={userName} size="sm" />
            </Link>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-night-700"
              onClick={onLoginClick}
            >
              <User className="h-5 w-5" />
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-night-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 pt-10">
                <Link 
                  to="/" 
                  className="text-xl font-bold text-urban-700"
                >
                  UrbanDashX
                </Link>
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "text-night-700 hover:text-urban-600 transition-colors font-medium",
                      isActive("/dashboard") && "text-urban-600"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/ride-share" 
                    className={cn(
                      "text-night-700 hover:text-urban-600 transition-colors font-medium",
                      isActive("/ride-share") && "text-urban-600"
                    )}
                  >
                    Find Ride
                  </Link>
                  <Link 
                    to="/food-order" 
                    className={cn(
                      "text-night-700 hover:text-urban-600 transition-colors font-medium",
                      isActive("/food-order") && "text-urban-600"
                    )}
                  >
                    Order Food
                  </Link>
                  <Link 
                    to="/help" 
                    className="text-night-700 hover:text-urban-600 transition-colors font-medium"
                  >
                    Help & Support
                  </Link>
                </nav>
                
                <Button 
                  className="w-full justify-start gap-2"
                  onClick={onLocationClick}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Find Location</span>
                </Button>
                
                {!isLoggedIn && (
                  <Button 
                    onClick={onLoginClick}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Search Bar - Expanded */}
      <div className={cn(
        "absolute left-0 right-0 px-4 md:px-8 transition-all duration-300 ease-in-out",
        searchOpen ? "top-full opacity-100" : "-top-20 opacity-0 pointer-events-none"
      )}>
        <div className="max-w-2xl mx-auto mt-2 bg-white rounded-full shadow-md flex items-center overflow-hidden">
          <input 
            type="text"
            placeholder="Search for restaurants, food, or destinations..."
            className="flex-grow px-6 py-3 text-night-800 bg-transparent outline-none"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-night-400 hover:text-night-600"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
