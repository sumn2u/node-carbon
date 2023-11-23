class MemoryUsageMeasurement {
    /**
     * Create a new MemoryUsageMeasurement object.
     */
    constructor() {
      this.startMemory = process.memoryUsage(); // Store the initial memory usage
      this.startTime = Date.now(); // Store the start time of the measurement
    }
  
    /**
     * Start measuring memory usage.
     */
    start() {
      this.startMemory = process.memoryUsage(); // Reset the start memory to the current memory usage
      this.startTime = Date.now(); // Reset the start time to the current time
    }
  
    /**
     * Stop measuring memory usage and return the results.
     * @returns {object} An object containing the RSS delta, heap total delta, heap used delta, and total time.
     */
    stop() {
      const endMemory = process.memoryUsage(this.startMemory); // Get the memory usage at the end of the measurement
      const endTime = Date.now(); // Get the end time of the measurement
      const totalTimeInSeconds = (endTime - this.startTime) / 1000; // Convert total time to seconds
  
      const rssDeltaMB = (endMemory.rss - this.startMemory.rss) / (1024 * 1024); // Calculate the RSS delta in MB
      const heapTotalDeltaMB = (endMemory.heapTotal - this.startMemory.heapTotal) / (1024 * 1024); // Calculate the heap total delta in MB
      const heapUsedDeltaMB = (endMemory.heapUsed - this.startMemory.heapUsed) / (1024 * 1024); // Calculate the heap used delta in MB
  
      return {
        rssDeltaMB, // The RSS delta in MB
        heapTotalDeltaMB, // The heap total delta in MB
        heapUsedDeltaMB, // The heap used delta in MB
        totalTimeInSeconds, // The total time in seconds
      };
    }
  }
  
  export default MemoryUsageMeasurement;
  