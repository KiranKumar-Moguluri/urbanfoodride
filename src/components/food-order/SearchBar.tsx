
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-night-400" />
      <Input 
        placeholder="Search for restaurants or cuisines..." 
        className="pl-10 pr-10 py-6 rounded-xl border-night-200"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-night-500"
      >
        <Filter className="h-5 w-5" />
      </Button>
    </div>
  );
}
