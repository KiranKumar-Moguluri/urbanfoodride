
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, MapPin, ShoppingBag, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { LocationSearch } from "@/components/LocationSearch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CartItem {
  id: number;
  restaurant: {
    id: string;
    name: string;
    image: string;
  };
  quantity: number;
  price: number;
}

const Checkout = () => {
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("350 5th Ave, New York, NY 10118");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [deliveryOption, setDeliveryOption] = useState<string>("standard");
  const [cart, setCart] = useState<{items: CartItem[], total: number}>({ items: [], total: 0 });
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load cart data (in a real app, this would come from a persistent cart state)
  useEffect(() => {
    // For demo purposes, let's create some cart items
    // In a real app, you would get this from a context, local storage, or an API
    const demoItems: CartItem[] = [
      {
        id: 1,
        restaurant: {
          id: "1",
          name: "Urban Bistro",
          image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
        },
        quantity: 1,
        price: 15.99
      },
      {
        id: 2,
        restaurant: {
          id: "3",
          name: "Taco Fiesta",
          image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFjb3N8ZW58MHx8MHx8fDA%3D"
        },
        quantity: 2,
        price: 12.99
      }
    ];

    const total = demoItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setCart({
      items: demoItems,
      total: total
    });
  }, []);

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Delivery address updated",
      description: location,
    });
  };

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      toast({
        title: "Payment information required",
        description: "Please fill in all card details to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: "Order placed successfully!",
        description: "Your food will be on its way shortly.",
      });
      
      // In a real app, you would clear the cart here
    }, 2000);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setCart({
      items: updatedItems,
      total: updatedTotal
    });
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart"
    });
  };

  const calculateTax = () => cart.total * 0.0875; // Example 8.75% tax
  const calculateDeliveryFee = () => deliveryOption === "express" ? 5.99 : 2.99;
  const calculateTotal = () => cart.total + calculateTax() + calculateDeliveryFee();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          isLoggedIn={true}
          userName="Regular User"
          onLoginClick={() => {}}
          onLocationClick={() => setLocationModalOpen(true)}
        />
        
        <div className="pt-24 px-4 md:px-8 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-night-800 mb-4">Order Confirmed!</h1>
              <p className="text-night-600 mb-6">
                Your order has been placed successfully. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="font-medium text-night-800 mb-2">Order Summary</div>
                <div className="flex justify-between mb-1">
                  <span className="text-night-600">Order #:</span>
                  <span className="font-medium">URB-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-night-600">Total:</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-night-600">Estimated Delivery:</span>
                  <span className="font-medium">30-45 minutes</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" onClick={() => navigate("/dashboard")}>
                  Back to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/food-order")}>
                  Order More Food
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="py-6 px-4 bg-white border-t text-center">
          <p className="text-night-700 text-sm font-medium">
            Kiran Kumar Moguluri
          </p>
          <p className="text-night-600 text-xs">
            Founder of UrbanDashX
          </p>
          <p className="text-night-500 text-xs mt-1">
            <a href="mailto:mogulurikirankumar@gmail.com" className="hover:text-urban-600">
              mogulurikirankumar@gmail.com
            </a>
          </p>
          <p className="text-night-500 text-xs mt-1">
            © 2025 UrbanDashX. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={true}
        userName="Regular User"
        onLoginClick={() => {}}
        onLocationClick={() => setLocationModalOpen(true)}
      />
      
      <div className="pt-24 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-night-800">Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart & Delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-night-800">Your Order</h2>
                </div>
                
                <div className="divide-y">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.restaurant.image} 
                          alt={item.restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-night-800">{item.restaurant.name}</h3>
                        <p className="text-sm text-night-600">Qty: {item.quantity}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <button 
                          className="text-xs text-red-600 hover:underline mt-1"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {cart.items.length === 0 && (
                    <div className="p-8 text-center text-night-600">
                      Your cart is empty. Add some items to proceed.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Delivery Options */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-night-800">Delivery Options</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-night-800">Delivery Address</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-urban-600 h-auto p-0"
                          onClick={() => setLocationModalOpen(true)}
                        >
                          Change
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-night-500 flex-shrink-0 mt-0.5" />
                        <div className="text-night-600">{currentLocation}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-night-800 mb-2">Delivery Speed</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer ${
                            deliveryOption === "standard" 
                              ? "border-urban-500 bg-urban-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setDeliveryOption("standard")}
                        >
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-night-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-night-800">Standard Delivery</div>
                              <div className="text-sm text-night-600">30-45 min</div>
                              <div className="text-sm font-medium text-night-800 mt-1">${(2.99).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer ${
                            deliveryOption === "express" 
                              ? "border-urban-500 bg-urban-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setDeliveryOption("express")}
                        >
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-urban-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-night-800">Express Delivery</div>
                              <div className="text-sm text-night-600">15-25 min</div>
                              <div className="text-sm font-medium text-night-800 mt-1">${(5.99).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-night-800">Payment Method</h2>
                </div>
                
                <div className="p-6">
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="card-number" className="text-sm font-medium text-night-700">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-night-400" />
                          <Input 
                            id="card-number"
                            placeholder="4242 4242 4242 4242"
                            className="pl-9"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label htmlFor="expiry" className="text-sm font-medium text-night-700">Expiry Date</label>
                          <Input 
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            maxLength={5}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="cvv" className="text-sm font-medium text-night-700">CVV</label>
                          <Input 
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                            maxLength={3}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-night-700">Name on Card</label>
                        <Input 
                          id="name"
                          placeholder="John Doe"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cash">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 flex items-center justify-center bg-urban-100 text-urban-600 rounded-full flex-shrink-0">
                            <ShoppingBag className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-night-800">Cash on Delivery</h3>
                            <p className="text-sm text-night-600 mt-1">
                              You'll pay in cash when your order is delivered. Please have the exact amount ready.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-night-800">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-night-600">Subtotal</span>
                    <span className="font-medium">${cart.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-night-600">Tax</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-night-600">Delivery Fee</span>
                    <span className="font-medium">${calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-2"></div>
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full py-6"
                    disabled={cart.items.length === 0 || isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                  
                  <p className="text-xs text-night-500 text-center">
                    By placing an order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-6 px-4 bg-white border-t text-center">
        <p className="text-night-700 text-sm font-medium">
          Kiran Kumar Moguluri
        </p>
        <p className="text-night-600 text-xs">
          Founder of UrbanDashX
        </p>
        <p className="text-night-500 text-xs mt-1">
          <a href="mailto:mogulurikirankumar@gmail.com" className="hover:text-urban-600">
            mogulurikirankumar@gmail.com
          </a>
        </p>
        <p className="text-night-500 text-xs mt-1">
          © 2025 UrbanDashX. All rights reserved.
        </p>
      </footer>
      
      <LocationSearch 
        open={locationModalOpen}
        onOpenChange={setLocationModalOpen}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default Checkout;
