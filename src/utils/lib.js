// Import necessary modules
import os from 'os';
import * as cpuData from '../data/cpu_power.json' assert { type: 'json' };
import * as globalEnergyData from '../data/global_energy_mix.json' assert { type: 'json' };
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
            return "Not supported";
        }
    } else {
        return "No CPU information available";
    }
};

// Function to get carbon  usage based on the country code
export const getCarbonUsage = (countryCode) => {
    const geoInfo = globalEnergyData.default[countryCode];
    if(geoInfo){
       return  geoInfo.carbon_intensity; 
    } else {
        return 475; // Global carbon intensity
    }
}
