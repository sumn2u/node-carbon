import CpuUsageMeasurement from '../src/cpuUsageMeasurement.js';
import { expect } from "chai";

describe('CpuUsageMeasurement', () => {
    it('should start measuring CPU usage', () => {
      const cpuUsageMeasurement = new CpuUsageMeasurement();
      expect(cpuUsageMeasurement.startUsage).to.be.null;
      cpuUsageMeasurement.start();
      expect(cpuUsageMeasurement.startTime).to.not.be.null;
    });
  
    it('should stop measuring CPU usage and return the results', () => {
      const cpuUsageMeasurement = new CpuUsageMeasurement();
      cpuUsageMeasurement.start();
  
      // Wait for a short period to simulate actual CPU usage
      setTimeout(() => {
        const measurementResults = cpuUsageMeasurement.stop();
  
        expect(measurementResults.cpuUsage).to.be.greaterThanOrEqual(0);
        expect(measurementResults.totalTimeInSeconds).to.be.greaterThan(0);
      }, 100);
    });
  });