import NodeCarbon from '../index.js';

// Create an instance of the NodeCarbon class
const nodeCarbon = new NodeCarbon();

// Get energy information about the current network provider
const energyInfo = await nodeCarbon.getEnergyInfo();
console.log("Energy info", energyInfo);

// Start measuring the carbon footprint of the current node process
await nodeCarbon.start();

// Wait for 1 second
setTimeout(async () => {
  // Stop measuring the carbon footprint and get the results
  const carbon = await nodeCarbon.stop();

  console.table({
    'CPU Usage (watts)': carbon.cpuUsageInfo.cpuUsage,
    'Total Time (s)': carbon.elapsedTime,
    'RSS Delta (Mb)': carbon.memoryUsageInfo.rssDeltaMB,
    'Heap Total Delta (Mb)': carbon.memoryUsageInfo.heapTotalDeltaMB,
    'Heap Used Delta (Mb)': carbon.memoryUsageInfo.heapUsedDeltaMB,
    'Carbon Consumption (gCO2e/kWh)': carbon.carbonEmission
  });

}, 1000);
