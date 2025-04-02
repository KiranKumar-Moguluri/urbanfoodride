
const { producer } = require('../config/kafka');
const { kafka } = require('../config/kafka');

// List of topics we'll use in our application
const TOPICS = {
  FOOD_ORDER_CREATED: 'food-order-created',
  RIDE_REQUEST_CREATED: 'ride-request-created',
  DELIVERY_STATUS_CHANGED: 'delivery-status-changed',
  RIDE_STATUS_CHANGED: 'ride-status-changed'
};

// Initialize Kafka producer
async function initializeProducer() {
  try {
    await producer.connect();
    console.log('✅ Kafka producer connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to Kafka producer:', error);
    // Don't exit process - allow server to still run without Kafka
  }
}

// Send message to Kafka topic
async function sendMessage(topic, message) {
  try {
    // If producer is not connected, try to connect
    if (!producer.isConnected) {
      await producer.connect();
    }

    // Send message to Kafka topic
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    
    console.log(`Message sent to topic ${topic}`);
    return true;
  } catch (error) {
    console.error(`Error sending message to topic ${topic}:`, error);
    return false;
  }
}

// Create a consumer with specified consumer group ID
function createConsumer(groupId) {
  return kafka.consumer({ groupId });
}

// Subscribe and consume messages from a topic
async function consumeMessages(consumer, topic, messageHandler) {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        try {
          const parsedValue = JSON.parse(value);
          await messageHandler(parsedValue);
        } catch (error) {
          console.error(`Error processing message from topic ${topic}:`, error);
        }
      },
    });
    
    console.log(`Consumer subscribed to topic ${topic}`);
    return true;
  } catch (error) {
    console.error(`Error consuming messages from topic ${topic}:`, error);
    return false;
  }
}

module.exports = {
  TOPICS,
  initializeProducer,
  sendMessage,
  createConsumer,
  consumeMessages
};
