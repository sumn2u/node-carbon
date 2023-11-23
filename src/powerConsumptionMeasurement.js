import CpuUsageMeasurement from './cpuUsageMeasurement.js';
import MemoryUsageMeasurement from './memoryUsageMeasurement.js';
import GeoCarbonUsageMeasurement from './geoCarbonUsageMeasurement.js';

/**
 * Class to measure the power consumption of a device.
 */
class PowerConsumptionMeasurement {
  /**
   * Create a new PowerConsumptionMeasurement object.
   */
  constructor() {
    // Create instances of the CPU, memory, and geolocation usage measurement classes
    this.cpuUsageMeasurement = new CpuUsageMeasurement();
    this.memoryUsageMeasurement = new MemoryUsageMeasurement();
    this.geoCarbonUsageMeasurement = new GeoCarbonUsageMeasurement();

    // Initialize variables for tracking start and end times
    this.startTime = 0;
    this.endTime = 0;

    // Store the geo-based power usage
    this.geoPowerUsage = 0;
  }

  /**
   * Start measuring power consumption. This includes fetching the geo-based power usage
   * and starting the CPU and memory usage measurements.
   */
  async start() {
    // Fetch the geo-based power usage
    this.geoPowerUsage = await this.geoCarbonUsageMeasurement.fetchPowerUsage();

    // Set the start time for all measurements
    this.startTime = Date.now();

    // Start measuring CPU usage
    this.cpuUsageMeasurement.start();

    // Start measuring memory usage
    this.memoryUsageMeasurement.start();
  }

  /**
   * Stop measuring power consumption and return the results. This includes stopping the CPU
   * and memory usage measurements and calculating the total power consumption.
   * @returns {object} An object containing the CPU usage information, memory usage information,
   * power consumption, and elapsed time.
   */
  async stop() {
    // Stop measuring CPU usage and get the results
    const cpuUsageInfo = this.cpuUsageMeasurement.stop();

    // Stop measuring memory usage and get the results
    const memoryUsageInfo = this.memoryUsageMeasurement.stop();

    // Set the end time for all measurements
    this.endTime = Date.now();

    // Calculate the elapsed time in seconds
    const elapsedTime = this.endTime - this.startTime;

    // Calculate the device's power consumption in kilowatt-hours
    const devicePowerConsumption = calculatePowerConsumption(cpuUsageInfo, memoryUsageInfo, elapsedTime);

    // Calculate the total carbon emission by combining geo and device power consumption
    const carbonEmission = this.geoPowerUsage * devicePowerConsumption;

    // Return the combined power consumption information
    return {
      cpuUsageInfo,
      memoryUsageInfo,
      carbonEmission,
      elapsedTime,
    };
  }
}

/**
 * Function to calculate the power consumption in kilowatt-hours based on CPU usage,
 * memory usage, and elapsed time.
 * @param {object} cpuUsageInfo The CPU usage information
 * @param {object} memoryUsageInfo The memory usage information
 * @param {number} elapsedTime The elapsed time in seconds
 * @returns {number} The power consumption in kilowatt-hours
 */
const calculatePowerConsumption = (cpuUsageInfo, memoryUsageInfo, elapsedTime) => {
  // Convert elapsed time from milliseconds to hours
  const timeInHours = elapsedTime / (1000 * 60 * 60);

  // Calculate the total power consumption in watts (assuming 3 watts for DDR4 memory)
  const totalPowerConsumption = cpuUsageInfo.cpuUsage + (memoryUsageInfo.rssDeltaMB * 3);
  // Convert power consumption from watts to kilowatt-hours
  const powerConsumptionInKWh = totalPowerConsumption * timeInHours;

  return powerConsumptionInKWh;
};

export default PowerConsumptionMeasurement;
