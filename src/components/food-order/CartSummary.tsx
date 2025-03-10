
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types/food-order.types";

interface CartSummaryProps {
  cart: Cart;
  needRide: boolean;
  rideDiscount: number;
  onCheckout: () => void;
}

export function CartSummary({ cart, needRide, rideDiscount, onCheckout }: CartSummaryProps) {
  if (cart.items.length === 0) return null;
  
  return (
    <div className="fixed bottom-5 left-0 right-0 px-4 z-10">
      <div className="max-w-md mx-auto">
        <Button 
          className="w-full py-6 shadow-lg rounded-xl justify-between group"
          onClick={onCheckout}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span>View Cart ({cart.items.length} items)</span>
            {needRide && (
              <span className="text-xs bg-green-200 text-green-800 py-0.5 px-2 rounded-full">
                + Ride {rideDiscount > 0 ? `(${rideDiscount}% off)` : ''}
              </span>
            )}
          </div>
          <div className="font-semibold">
            ${cart.total.toFixed(2)}
          </div>
        </Button>
      </div>
    </div>
  );
}
