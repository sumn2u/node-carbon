import chai from 'chai';
import sinon from 'sinon';
import PowerConsumptionMeasurement from '../src/powerConsumptionMeasurement.js';
import { expect } from "chai";

chai.should();

describe('PowerConsumptionMeasurement', () => {
  it('should measure power consumption', async () => {
    // Stub the getCarbonUsage method to return a specific value
    const getCarbonUsageStub = sinon.stub().resolves(379.26); // USA geo power usage value

    // Create an instance of PowerConsumptionMeasurement with the stubbed getCarbonUsage method
    const powerConsumptionMeasurement = new PowerConsumptionMeasurement();
    powerConsumptionMeasurement.geoCarbonUsageMeasurement.getCarbonUsage = getCarbonUsageStub;

    // Start measuring power consumption
    await powerConsumptionMeasurement.start();

    // Simulate some CPU and memory usage
    const array = new Array(1000000); // Allocating an array to simulate memory usage

    // Stop measuring power consumption
    const results = await powerConsumptionMeasurement.stop();

    // Assert the results
    results.should.have.property('cpuUsageInfo').that.is.an('object');
    results.should.have.property('memoryUsageInfo').that.is.an('object');
    results.should.have.property('carbonEmission').that.is.a('number');
    results.should.have.property('elapsedTime').that.is.a('number');

    // Log the results for manual inspection
    console.log('Power Consumption Measurement Results:', results);
  });

  it('should successfully retrieve and map energy usage information for the current country', async () => {
    // Create an instance of PowerConsumptionMeasurement
    const powerConsumptionMeasurement = new PowerConsumptionMeasurement();
  
    // Stub the getCountryEnergyUsageInfo method to return a valid energy usage response
    const mockEnergyUsageInfo = {
      biofuel_TWh: 54.25,
      carbon_intensity: 379.26,
      coal_TWh: 898,
      country_name: 'United States',
      fossil_TWh: 2512.39,
      gas_TWh: 1579.19,
      hydroelectricity_TWh: 246.47,
      iso_code: 'USA',
      low_carbon_TWh: 1641.23,
      nuclear_TWh: 779.65,
      oil_TWh: 35.2,
      other_renewable_TWh: 72.49,
      other_renewable_exc_biofuel_TWh: 18.24,
      per_capita_Wh: 12325.368,
      renewables_TWh: 861.58,
      solar_TWh: 164.42,
      total_TWh: 4153.62,
      wind_TWh: 378.2,
      year: 2021
    };
  
    // The expected mapped energy information
    const mockEnergyInfo = {
      country: 'United States',
      carbon_intensity_electricity: 379.26,
      biofuel_electricity: 54.25,
      coal_electricity: 898,
      fossil_electricity: 2512.39,
      gas_electricity: 1579.19,
      hydro_electricity: 246.47,
      low_carbon_electricity: 1641.23,
      nuclear_electricity: 779.65,
      oil_electricity: 35.2,
      other_renewable_electricity: 72.49,
      other_renewable_exc_biofuel_electricity: 18.24,
      per_capita_electricity: 12325.368,
      renewables_electricity: 861.58,
      solar_electricity: 164.42,
      wind_electricity: 378.2
    };
  
    // Stub the getCountryEnergyUsageInfo method
    const getCountryEnergyUsageInfoStub = sinon.stub().resolves(mockEnergyUsageInfo);
    powerConsumptionMeasurement.geoCarbonUsageMeasurement.getCountryEnergyUsageInfo = getCountryEnergyUsageInfoStub;
  
    // Call the getEnergyInfo method
    const energyUsageInfo = await powerConsumptionMeasurement.getEnergyInfo();
  
    // Verify that the getCountryEnergyUsageInfo method was called once
    sinon.assert.calledOnce(getCountryEnergyUsageInfoStub);
  
    // Verify that the retrieved energy usage information matches the expected response
    expect(energyUsageInfo).to.deep.equal(mockEnergyInfo);
  
    // Verify that the retrieved energy usage information is mapped correctly to the expected format
    expect(energyUsageInfo.carbon_intensity).to.equal(mockEnergyInfo.carbon_intensity);
    expect(energyUsageInfo.biofuel_electricity).to.equal(mockEnergyInfo.biofuel_electricity);
    expect(energyUsageInfo.coal_electricity).to.equal(mockEnergyInfo.coal_electricity);
  });

  it('should start measuring power consumption and stop at the specified interval', async () => {
    // Create an instance of PowerConsumptionMeasurement
    const powerConsumptionMeasurement = new PowerConsumptionMeasurement();

    // Create a mock function for the stopAndReport method
    const stopAndReportStub = sinon.stub().resolves();
    powerConsumptionMeasurement.stopAndReport = stopAndReportStub;

    // Set a timeout to wait for the interval to complete (adjust as needed)
    const waitTime = 1000; // 1 second
    const intervalDuration = 600;

    // Call the startMeasurementWithInterval method
    await powerConsumptionMeasurement.startMeasurementWithInterval(intervalDuration);

    // Wait for a sufficient time to allow the interval to execute
    await new Promise(resolve => setTimeout(resolve, waitTime));

    // Verify that the `stopAndReport` method was called
    expect(stopAndReportStub.called).to.be.true

    // Call the stopPowerMeasurement method to stop the test explicitly
    await powerConsumptionMeasurement.stopPowerMeasurement();
  })
});
