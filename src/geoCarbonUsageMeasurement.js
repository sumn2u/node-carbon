import { getCarbonUsage, fetchGeoInfo } from './utils/lib.js';

/**
 * Class to fetch carbon usage based on the current location.
 */
class GeoCarbonUsageMeasurement {
  /**
   * Asynchronously fetches carbon usage based on the current location.
   * @returns {Promise<number>} The carbon usage in gCO2e/kWh.
   */
  async fetchPowerUsage() {
    try {
      // Fetch the geolocation information
      const geoInfo = await fetchGeoInfo();

      // Extract the country code from the geolocation information
      const { country_code3 } = geoInfo;

      // Fetch the carbon usage for the given country code
      const carbonUsage = await getCarbonUsage(country_code3);

      // Return the carbon usage
      return carbonUsage;
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(`Error fetching carbon usage: ${error.message}`);
    }
  }
}

export default GeoCarbonUsageMeasurement;
