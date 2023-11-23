import chai from 'chai';
import sinon from 'sinon';
import PowerConsumptionMeasurement from '../src/powerConsumptionMeasurement.js';

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
});
