
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodCard } from "@/components/FoodCard";
import { Restaurant } from "@/types/food-order.types";

interface RestaurantTabsProps {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export function RestaurantTabs({ restaurants, onRestaurantSelect }: RestaurantTabsProps) {
  const nearbyRestaurants = restaurants.filter(r => parseFloat(r.distance) < 1.0);
  const popularRestaurants = restaurants.filter(r => r.rating >= 4.5);
  const featuredRestaurants = restaurants.filter(r => r.featured);
  
  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="nearby">Nearby</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="featured">Featured</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <FoodCard 
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="nearby" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyRestaurants.map((restaurant) => (
            <FoodCard 
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="popular" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRestaurants.map((restaurant) => (
            <FoodCard 
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="featured" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <FoodCard 
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
