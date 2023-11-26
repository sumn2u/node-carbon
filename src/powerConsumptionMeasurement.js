import CpuUsageMeasurement from './cpuUsageMeasurement.js';
import MemoryUsageMeasurement from './memoryUsageMeasurement.js';
import GeoCarbonUsageMeasurement from './geoCarbonUsageMeasurement.js';
import { mapObjectWithColumns } from './utils/lib.js';

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
    // Store the carbon intensity information
    this.carbonIntesityInfo = null;
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
   * Asynchronously retrieves and stores the carbon intensity information for the current country
   */
  async getEnergyInfo() {

    // Asynchronously retrieve the carbon usage information for the current country
    const countryEnergyUsage = await this.geoCarbonUsageMeasurement.getCountryEnergyUsageInfo();

    if(countryEnergyUsage) {
      // Mapping of old column names to new ones
      const columnNames = {
        'country': 'country_name',
        'carbon_intensity_electricity': 'carbon_intensity',
        'biofuel_electricity': 'biofuel_TWh',
        'coal_electricity': 'coal_TWh',
        'fossil_electricity': 'fossil_TWh',
        'gas_electricity': 'gas_TWh',
        'hydro_electricity': 'hydroelectricity_TWh',
        'low_carbon_electricity': 'low_carbon_TWh',
        'nuclear_electricity': 'nuclear_TWh',
        'oil_electricity': 'oil_TWh',
        'other_renewable_electricity': 'other_renewable_TWh',
        'other_renewable_exc_biofuel_electricity': 'other_renewable_exc_biofuel_TWh',
        'per_capita_electricity': 'per_capita_Wh',
        'renewables_electricity': 'renewables_TWh',
        'solar_electricity': 'solar_TWh',
        'wind_electricity': 'wind_TWh'
      };

      this.carbonIntesityInfo = mapObjectWithColumns(countryEnergyUsage, columnNames);
      return this.carbonIntesityInfo;
    }
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
