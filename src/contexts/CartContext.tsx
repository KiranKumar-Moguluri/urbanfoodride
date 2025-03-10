
import { createContext, useContext, useState, ReactNode } from "react";
import { Cart, CartItem, FoodItem, Restaurant } from "@/types/food-order.types";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: Cart;
  addToCart: (item: FoodItem, restaurant: Restaurant) => void;
  removeFromCart: (itemId: string, restaurantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const { toast } = useToast();

  const addToCart = (item: FoodItem, restaurant: Restaurant) => {
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === item.id && cartItem.restaurantId === restaurant.id
    );
    
    let newItems = [...cart.items];
    let newTotal = cart.total;
    
    if (existingItemIndex >= 0) {
      newItems[existingItemIndex].quantity += 1;
      newTotal += item.price;
    } else {
      newItems.push({
        id: item.id,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
        itemName: item.name,
        itemPrice: item.price,
        quantity: 1
      });
      newTotal += item.price;
    }
    
    setCart({
      items: newItems,
      total: newTotal
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} from ${restaurant.name} added to your cart`,
    });
  };

  const removeFromCart = (itemId: string, restaurantId: string) => {
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === itemId && cartItem.restaurantId === restaurantId
    );
    
    if (existingItemIndex < 0) return;
    
    const item = cart.items[existingItemIndex];
    let newItems = [...cart.items];
    let newTotal = cart.total;
    
    if (item.quantity > 1) {
      newItems[existingItemIndex].quantity -= 1;
      newTotal -= item.itemPrice;
    } else {
      newItems = newItems.filter((_, index) => index !== existingItemIndex);
      newTotal -= item.itemPrice;
    }
    
    setCart({
      items: newItems,
      total: newTotal
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
