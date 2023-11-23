import chai from 'chai';
import MemoryUsageMeasurement  from '../src/memoryUsageMeasurement.js';

chai.should();

describe('MemoryUsageMeasurement', () => {
  it('should measure memory usage', () => {
    // Create an instance of MemoryUsageMeasurement
    const memoryUsageMeasurement = new MemoryUsageMeasurement();

    // Simulate some memory usage
    const array = new Array(1000000); // Allocating an array to simulate memory usage

    // Start measuring memory usage
    memoryUsageMeasurement.start();

    // Simulate some more memory usage
    const anotherArray = new Array(500000);

    // Stop measuring memory usage
    const results = memoryUsageMeasurement.stop();

    // Assert the results
    results.should.have.property('rssDeltaMB').that.is.a('number');
    results.should.have.property('heapTotalDeltaMB').that.is.a('number');
    results.should.have.property('heapUsedDeltaMB').that.is.a('number');
    results.should.have.property('totalTimeInSeconds').that.is.a('number');

    // Log the results for manual inspection
    console.log('Memory Usage Measurement Results:', results);
  });
});