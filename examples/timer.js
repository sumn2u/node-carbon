import NodeCarbon from '../index.js';

// Create an instance of the NodeCarbon class
const nodeCarbon = new NodeCarbon();

// Measure carbon consumption in an interval (milliseconds)
 nodeCarbon.startMeasurementWithInterval(6000); // Measure every minute

// Clear the timer interval after a specific time (e.g., 30 seconds)
setTimeout(async () => {
    await nodeCarbon.stopPowerMeasurement();
  }, 30000); // Stop after 30 seconds