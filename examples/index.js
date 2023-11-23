
import NodeCarbon from '../index.js';

// Create an instance of the NodeCarbon class
const nodeCarbon = new NodeCarbon();

// Start measuring the carbon footprint of the current node process
await nodeCarbon.start();

// Wait for 1 second
setTimeout(async () => {
  // Stop measuring the carbon footprint and get the results
  const carbon = await nodeCarbon.stop();

  // Log the CPU usage
  console.log(`CPU usage: ${carbon.cpuUsageInfo.cpuUsage} watts`);

  // Log the total time of the measurement
  console.log(`Total time: ${carbon.elapsedTime} s`);

  // Log the RSS delta (Resident Set Size)
  console.log(`RSS delta: ${carbon.memoryUsageInfo.rssDeltaMB} Mb`);

  // Log the heap total delta
  console.log(`Heap total delta: ${carbon.memoryUsageInfo.heapTotalDeltaMB} Mb`);

  // Log the heap used delta
  console.log(`Heap used delta: ${carbon.memoryUsageInfo.heapUsedDeltaMB} Mb`);

  // Log the carbon consumption in gCO2e/kWh
  console.log(`Carbon consumption: ${carbon.carbonEmission} gCO2e/kWh`);

}, 1000);
