class CpuUsageMeasurement {
    /**
     * Create a new CpuUsageMeasurement object.
     */
    constructor() {
      this.startUsage = null; // Stores the CPU usage at the start of the measurement
      this.startTime = null; // Stores the start time of the measurement
    }
  
    /**
     * Start measuring CPU usage.
     */
    start() {
      this.startUsage = process.cpuUsage(); // Get the current CPU usage
      this.startTime = Date.now(); // Get the current time
    }
  
    /**
     * Stop measuring CPU usage and return the results.
     * @returns {object} An object containing the CPU usage and total time.
     */
    stop() {
      const endUsage = process.cpuUsage(this.startUsage); // Get the CPU usage at the end of the measurement
      const endTime = Date.now(); // Get the end time of the measurement
      const totalTimeInSeconds = (endTime - this.startTime) / 1000; // Convert total time to seconds
  
      const cpuUsageDiff = endUsage.user - this.startUsage?.user; // Calculate the difference in CPU usage
      const cpuUsage = cpuUsageDiff > 0 ? cpuUsageDiff / totalTimeInSeconds : 0; // Calculate the average CPU usage
  
      return {
        cpuUsage, // The average CPU usage in watts
        totalTimeInSeconds, // The total time in seconds
      };
    }
  }
  
  export default CpuUsageMeasurement;
  