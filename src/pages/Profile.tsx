import { Navbar } from "@/components/Navbar";
import { AccountSettings } from "@/components/AccountSettings";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLocationClick = () => {
    // Handle location click
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={!!user}
        onLoginClick={handleLoginClick}
        onLocationClick={handleLocationClick}
        userName={user?.name}
      />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <AccountSettings />
      </div>
    </div>
  );
}
