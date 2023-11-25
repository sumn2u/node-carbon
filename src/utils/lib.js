// Import necessary modules
import os from 'os';
import * as cpuData from '../data/cpu_power.json' assert { type: 'json' };
import * as globalEnergyData from '../data/global_energy_mix.json' assert { type: 'json' };
import * as carbonIntensityData from '../data/carbon_intesity_per_source.json' assert {type: 'json'};
import https from 'https';

// Function to make an asynchronous HTTP request to get geographic information based on the IP address
const makeRequest = async () => {
  // Define options for the HTTP request
  const options = {
    hostname: 'get.geojs.io',
    path: '/v1/ip/geo.json',
    method: 'GET',
  };

  // Define a function to make the actual HTTP request and return a promise
  const makeHttpRequest = () => new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      // Collect data as it comes in
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Resolve the promise with the collected data when the response ends
      res.on('end', () => {
        resolve(data);
      });
    });

    // Handle errors in the HTTP request
    req.on('error', (error) => {
      reject(error);
    });

    // End the request
    req.end();
  });

  try {
    // Attempt to make the HTTP request and parse the JSON response
    const response = await makeHttpRequest();
    return JSON.parse(response); // Parse the JSON response and return it
  } catch (error) {
    // Handle errors during the HTTP request
    console.error(`Error: ${error.message}`);
    throw error; // Re-throw the error for the caller to handle if needed
  }
};

// Function to fetch geographic information using the makeRequest function
export const fetchGeoInfo = async () => {
    try {
      const result = await makeRequest();
      return result;
    } catch (error) {
      // Handle errors here if needed
      console.error(`Error in fetchGeoInfo: ${error.message}`);
      throw error;
    }
  };

// Function to get TDP value based on CPU name
const getCpuNameAndTdpValue = (cpuName) => {
    return  cpuData.default.find(cpu => cpu.name === cpuName)?.tdp;
  }

// Function to get RAM information
export const getRamInfo = () => {
    const ramName = os.freemem();
    return ramName;
}

// Function to get total CPU wattage based on the model of the CPU
export const getTotalCpuWattage = () => {
    // Get CPU information
    const [cpuInfo] = os.cpus();
    if (cpuInfo) {
        const { model } = cpuInfo;

        // Get TDP value based on the CPU model
        const tdpValue = getCpuNameAndTdpValue(model);

        if (tdpValue !== undefined) {
            return tdpValue;
        } else {
            return "Misssing CPU information"; // ADD missing cpu information to cpu_power.json
        }
    } else {
        return "No CPU information available"; // TODO Get global average CPU tdp
    }
};

// Function to get carbon  usage based on the country code
export const getCarbonUsage = (countryCode) => {
    const geoInfo = globalEnergyData.default[countryCode];
    if(geoInfo){
       return  geoInfo.carbon_intensity; 
    } else {
        return carbonIntensityData.world_average; // Global carbon intensity
    }
}

/**
 * Function to retrieve energy usage information for a specific country
 *
 * @param {string} countryCode The country code for which to retrieve carbon usage information
 * @returns {object|string} The country-specific energy usage information, or a message indicating that no information was found
 */
export const getEnergyUsageInfo = (countryCode) => {
  // Retrieve the country-specific information from the global energy data
  const geoInfo = globalEnergyData.default[countryCode];

  // Check if country information exists
  if (geoInfo) {
    // Return the country information if it exists
    return geoInfo;
  } else {
    // If no information is found, return a default message
    return "Couldn't find information";
  }
};


// Function to map an object's keys based on a provided mapping
export const mapObjectWithColumns = (inputObject, columnNames) => {
  // Create a new object by mapping old keys to new keys
  const mappedObject = Object.fromEntries(
    // Iterate over the entries of the columnNames mapping
    Object.entries(columnNames).map(([newKey, oldKey]) => [newKey, inputObject[oldKey]])
  );

  // Return the new object with mapped keys
  return mappedObject;
};
