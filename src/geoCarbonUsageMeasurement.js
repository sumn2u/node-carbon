import { getCarbonUsage, getEnergyUsageInfo, fetchGeoInfo } from './utils/lib.js';

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
  
  /**
   * Asynchronously retrieves carbon usage information for the current country
   *
   * @returns {Promise<object|string>} A promise that resolves to either the country-specific carbon usage information, or a message indicating that no information was found
   */
    async getCountryEnergyUsageInfo() {

      try {
        // fetch the country's geographic information
        const geoInfo = await fetchGeoInfo();
        const countryCode3 = geoInfo.country_code3;

        // Retrieve energy usage information for the retrieved country code
        const energyUsage = await getEnergyUsageInfo(countryCode3);

        // Return the retrieved energy usage information
        return energyUsage;

      } catch (error) {
        // Handle any errors that occur during the process
        console.error(`Error fetching carbon usage: ${error.message}`);
      }
  }
}

export default GeoCarbonUsageMeasurement;
