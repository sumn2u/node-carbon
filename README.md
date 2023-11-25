# 🌱 Node Carbon: A Node Package for Measuring Carbon Footprints 🌐

Ever pondered the environmental impact of your Node.js processes? Enter Node Carbon – your solution for calculating the carbon footprint of your current Node.js operations.

[![status](https://joss.theoj.org/papers/2319047071d2f0e14401ca3ced73c0c0/status.svg)](https://joss.theoj.org/papers/2319047071d2f0e14401ca3ced73c0c0)

## Why Measure Your Carbon Footprint? 🌍

Understanding the carbon footprint of your Node.js processes is crucial for businesses, organizations, and individuals striving to minimize their environmental impact and enhance resource efficiency. As we collectively aim for a greener future, Node Carbon empowers you to make informed decisions and take proactive steps towards sustainability.

## How Does Node Carbon Work? ⚙️

Node Carbon estimates the electricity consumption of your hardware (CPU+RAM) and then applies the carbon intensity specific to the region where the computing is taking place. This comprehensive approach ensures that you get an accurate and localized assessment of your digital carbon footprint.

![Carbon Emission Calculation](https://raw.githubusercontent.com/sumn2u/node-carbon/main/paper/carbon_emission.png)


## Key Features  🔍

1. **Precision in Measurement:** Node Carbon provides a detailed breakdown of electricity consumption, considering the specific hardware components involved in your Node.js processes.

2. **Regional Carbon Intensity:** By factoring in the carbon intensity of the region where your computations occur, Node Carbon offers a nuanced understanding of the environmental impact.

3. **Empowering Sustainable Choices:** Armed with insights from Node Carbon, you can make informed decisions to optimize resource usage, reduce energy consumption, and contribute to a more sustainable digital ecosystem.


## Get Started Today! 🚀

Ready to take the first step towards a greener digital footprint? Node Carbon is here to help. Calculate, analyze, and optimize your Node.js processes for a more sustainable future. Install node carbon.

```bash
npm install node-carbon --save-dev
yarn add node-carbon --dev # or yarn
```

## Example

```js
const nodeCarbon = new NodeCarbon();
// start logging energy usage
await nodeCarbon.start();

setTimeout(async () => {
  // Stop carbon logging of current process
  const carbon = await nodeCarbon.stop();
  console.table({
  'CPU Usage (watts)': carbon.cpuUsageInfo.cpuUsage,
  'Total Time (s)': carbon.elapsedTime,
  'RSS Delta (Mb)': carbon.memoryUsageInfo.rssDeltaMB,
  'Heap Total Delta (Mb)': carbon.memoryUsageInfo.heapTotalDeltaMB,
  'Heap Used Delta (Mb)': carbon.memoryUsageInfo.heapUsedDeltaMB,
  'Carbon Consumption (gCO2e/kWh)': carbon.carbonEmission
});
}, 1000);
```

| Metric                                   | Unit         |
| ---------------------------------------- | ------------ |
| CPU Usage                                | watts        |
| Elapsed Time                             | seconds      |
| Memory Usage (RSS Delta)                  | Mb           |
| Memory Usage (Heap Total Delta)           | Mb           |
| Memory Usage (Heap Used Delta)            | Mb           |
| Carbon Emission                          | gCO2e/kWh    |


## Testing

```bash
 yarn test
```

## Experiments
Experiments with different packages are done [here](https://github.com/sumn2u/node-carbon/tree/experiments/experiments).

## TODOs
- Develop a more effective method for measuring the power consumption of RAM.

## Contributing

1. Fork and clone it
1. Install dependencies: `npm install`
1. Create a feature branch: `git checkout -b new-feature`
1. Commit changes: `git commit -am 'Added a feature'`
1. Run static code analysis and unit tests: `npm test`
1. Push to the remote branch: `git push origin new-feature`
1. Create a new [Pull Request](https://github.com/sumn2u/node-carbon/pull/new/main)

## License

Code released under the [MIT license](./LICENSE).
