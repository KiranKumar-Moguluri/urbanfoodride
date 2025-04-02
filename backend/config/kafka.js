
const { Kafka } = require('kafkajs');
require('dotenv').config();

// Get Kafka connection details from environment variables or use defaults
const KAFKA_BROKERS = process.env.KAFKA_BROKERS || 'localhost:9092';

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'urbandashx-service',
  brokers: KAFKA_BROKERS.split(','),
  retry: {
    initialRetryTime: 100,
    retries: 5
  }
});

// Create producer instance
const producer = kafka.producer();

// Export Kafka instances
module.exports = {
  kafka,
  producer
};
