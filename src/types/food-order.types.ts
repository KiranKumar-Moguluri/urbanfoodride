
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
  featured?: boolean;
  menuItems?: FoodItem[];
}

export interface CartItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface RideRequest {
  needRide: boolean;
  pickupLocation: string;
  pickupDistance: number;
  rideTime: string;
  rideCapacity: number;
  rideDiscount: number;
}
