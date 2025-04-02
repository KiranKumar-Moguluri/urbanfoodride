
const { createConsumer, consumeMessages, TOPICS } = require('./kafkaService');

// Initialize consumer for order events
async function initOrderConsumers() {
  try {
    // Consumer for food orders
    const foodOrderConsumer = createConsumer('food-order-group');
    await consumeMessages(foodOrderConsumer, TOPICS.FOOD_ORDER_CREATED, handleFoodOrder);
    
    // Consumer for ride requests
    const rideRequestConsumer = createConsumer('ride-request-group');
    await consumeMessages(rideRequestConsumer, TOPICS.RIDE_REQUEST_CREATED, handleRideRequest);
    
    console.log('Order consumers initialized successfully');
  } catch (error) {
    console.error('Failed to initialize order consumers:', error);
  }
}

// Handle food order messages
async function handleFoodOrder(orderData) {
  console.log('Processing food order:', orderData.orderId);
  // Here you would:
  // 1. Save the order to database
  // 2. Calculate delivery route and ETA
  // 3. Assign delivery agent
  // 4. Update order status
  
  // For now, we'll just log the data
  console.log('Food order being processed:', orderData);
}

// Handle ride request messages
async function handleRideRequest(rideData) {
  console.log('Processing ride request:', rideData.requestId);
  
  // Here you would:
  // 1. Determine if pickup is on same route as an associated food order
  // 2. Calculate ride discount based on proximity
  // 3. Assign driver or aggregate with food delivery
  // 4. Update ride status
  
  // For now, we'll just log the data
  console.log('Ride request being processed:', rideData);
  
  // If ride is associated with food order, check route optimization
  if (rideData.associatedOrderId) {
    console.log(`Optimizing ride with food order ${rideData.associatedOrderId}`);
    // Logic to optimize ride with food delivery would go here
  }
}

module.exports = {
  initOrderConsumers
};
