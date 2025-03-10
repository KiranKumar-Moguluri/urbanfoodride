
import { Restaurant, FoodItem } from "@/types/food-order.types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Urban Bistro",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    distance: "1.2 mi",
    priceRange: "$$$",
    featured: true,
    menuItems: [
      {
        id: "1-1",
        name: "Signature Burger",
        price: 15.99,
        description: "Prime beef patty with caramelized onions, cheddar cheese, and house sauce"
      },
      {
        id: "1-2",
        name: "Truffle Fries",
        price: 8.99,
        description: "Hand-cut potatoes fried to perfection, tossed with truffle oil and parmesan"
      },
      {
        id: "1-3",
        name: "Cobb Salad",
        price: 12.99,
        description: "Fresh greens with grilled chicken, bacon, avocado, eggs, and blue cheese"
      }
    ]
  },
  {
    id: "2",
    name: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "25-35 min",
    distance: "2.0 mi",
    priceRange: "$$$$",
    featured: true,
    menuItems: [
      {
        id: "2-1",
        name: "Rainbow Roll",
        price: 18.99,
        description: "Crab, cucumber, and avocado roll topped with assorted sashimi"
      },
      {
        id: "2-2",
        name: "Spicy Tuna Roll",
        price: 14.99,
        description: "Fresh tuna mixed with spicy mayo and cucumber"
      },
      {
        id: "2-3",
        name: "Miso Soup",
        price: 4.99,
        description: "Traditional Japanese soup with tofu, seaweed, and green onions"
      }
    ]
  },
  {
    id: "3",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFjb3N8ZW58MHx8MHx8fDA%3D",
    cuisine: "Mexican",
    rating: 4.5,
    deliveryTime: "15-25 min",
    distance: "0.8 mi",
    priceRange: "$$",
    featured: true,
    menuItems: [
      {
        id: "3-1",
        name: "Taco Salad",
        price: 10.99,
        description: "Grilled chicken, lettuce, tomato, and cheese"
      },
      {
        id: "3-2",
        name: "Chalupa",
        price: 8.99,
        description: "Soft taco shell filled with ground beef, cheese, and salsa"
      },
      {
        id: "3-3",
        name: "Burrito",
        price: 12.99,
        description: "Soft flour tortilla filled with ground beef, cheese, beans, and salsa"
      }
    ]
  },
  {
    id: "4",
    name: "Pasta Palace",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhc3RhfGVufDB8fDB8fHww",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "20-35 min",
    distance: "1.5 mi",
    priceRange: "$$$",
    menuItems: [
      {
        id: "4-1",
        name: "Margherita Pizza",
        price: 12.99,
        description: "Tomato sauce, mozzarella cheese, and fresh basil"
      },
      {
        id: "4-2",
        name: "Penne Alfredo",
        price: 15.99,
        description: "Penne pasta tossed with Alfredo sauce, garlic, and parmesan"
      },
      {
        id: "4-3",
        name: "Lasagna",
        price: 18.99,
        description: "Layers of pasta, meat sauce, and mozzarella cheese"
      }
    ]
  },
  {
    id: "5",
    name: "Noodle House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    cuisine: "Asian",
    rating: 4.7,
    deliveryTime: "15-30 min",
    distance: "1.1 mi",
    priceRange: "$$",
    menuItems: [
      {
        id: "5-1",
        name: "Pad Thai",
        price: 10.99,
        description: "Noodles stir-fried with tofu, shrimp, and vegetables"
      },
      {
        id: "5-2",
        name: "Gyoza",
        price: 7.99,
        description: "Flaky dumplings filled with pork and vegetables"
      },
      {
        id: "5-3",
        name: "Ramen",
        price: 12.99,
        description: "Japanese noodle soup with pork broth and toppings"
      }
    ]
  },
  {
    id: "6",
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8fDB8fHww",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "10-20 min",
    distance: "0.5 mi",
    priceRange: "$$",
    menuItems: [
      {
        id: "6-1",
        name: "Cheeseburger",
        price: 10.99,
        description: "Bun with beef patty, cheese, lettuce, tomato, and pickles"
      },
      {
        id: "6-2",
        name: "Fries",
        price: 5.99,
        description: "Hand-cut fries with ketchup and mayonnaise"
      },
      {
        id: "6-3",
        name: "Onion Rings",
        price: 3.99,
        description: "Crispy onion rings with ranch dressing"
      }
    ]
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getFilteredRestaurants = (searchQuery: string): Restaurant[] => {
  if (!searchQuery) return restaurants;
  
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const getNearbyRestaurants = (maxDistance: number = 1.0): Restaurant[] => {
  return restaurants.filter(r => parseFloat(r.distance) < maxDistance);
};

export const getPopularRestaurants = (minRating: number = 4.5): Restaurant[] => {
  return restaurants.filter(r => r.rating >= minRating);
};

export const getFeaturedRestaurants = (): Restaurant[] => {
  return restaurants.filter(r => r.featured);
};

// Ensure all restaurants have menu items
restaurants.forEach(restaurant => {
  if (!restaurant.menuItems) {
    restaurant.menuItems = [
      {
        id: `${restaurant.id}-1`,
        name: `${restaurant.name} Special`,
        price: 15.99,
        description: `Signature dish from ${restaurant.name}`
      },
      {
        id: `${restaurant.id}-2`,
        name: `${restaurant.cuisine} Classic`,
        price: 12.99,
        description: `Traditional ${restaurant.cuisine} favorite`
      },
      {
        id: `${restaurant.id}-3`,
        name: "Side Dish",
        price: 7.99,
        description: "Perfect complement to your meal"
      }
    ];
  }
});
