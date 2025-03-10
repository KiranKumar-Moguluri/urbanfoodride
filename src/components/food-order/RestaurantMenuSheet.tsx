
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Restaurant, FoodItem, CartItem } from "@/types/food-order.types";

interface RestaurantMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant | null;
  cartItems: CartItem[];
  onAddToCart: (item: FoodItem) => void;
  onRemoveFromCart: (itemId: string, restaurantId: string) => void;
}

export function RestaurantMenuSheet({
  open,
  onOpenChange,
  restaurant,
  cartItems,
  onAddToCart,
  onRemoveFromCart
}: RestaurantMenuSheetProps) {
  if (!restaurant) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="h-full flex flex-col">
          <div className="relative h-48 w-full bg-night-100">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <h2 className="text-2xl font-bold mb-1">{restaurant.name}</h2>
            <div className="flex items-center gap-2 text-night-600 text-sm mb-6">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.rating} ★</span>
              <span>•</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
            
            <h3 className="font-medium text-lg mb-4">Menu</h3>
            
            <div className="space-y-6">
              {restaurant.menuItems?.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-4">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-night-600 mt-1">{item.description}</p>
                    <p className="text-sm font-medium mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => onAddToCart(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-white">
              <h3 className="font-medium mb-3">Items in Cart</h3>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-night-600">{item.quantity}x</span>
                      <span>{item.itemName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>${(item.itemPrice * item.quantity).toFixed(2)}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 rounded-full p-0" 
                        onClick={() => onRemoveFromCart(item.id, item.restaurantId)}
                      >
                        <span className="sr-only">Remove</span>
                        <span className="text-red-500">-</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
