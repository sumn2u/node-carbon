# 🌱 Node Carbon: Quantifying Your Digital Footprint 🌐

Ever pondered the environmental impact of your Node.js processes? Enter Node Carbon – your solution for calculating the carbon footprint of your current Node.js operations.

## Why Measure Your Carbon Footprint? 🌍

Understanding the carbon footprint of your Node.js processes is crucial for businesses, organizations, and individuals striving to minimize their environmental impact and enhance resource efficiency. As we collectively aim for a greener future, Node Carbon empowers you to make informed decisions and take proactive steps towards sustainability.

## How Does Node Carbon Work? ⚙️

Node Carbon estimates the electricity consumption of your hardware (CPU+RAM) and then applies the carbon intensity specific to the region where the computing is taking place. This comprehensive approach ensures that you get an accurate and localized assessment of your digital carbon footprint.

![Carbon Emission Calculation](https://raw.githubusercontent.com/sumn2u/node-carbon/main/images/carbon_emission.png)


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
  console.log(`CPU usage: ${carbon.cpuUsageInfo.cpuUsage} watts`);
  console.log(`Total time: ${carbon.elapsedTime} s`);
  console.log(`RSS delta: ${carbon.memoryUsageInfo.rssDeltaMB} Mb`);
  console.log(`Heap total delta: ${carbon.memoryUsageInfo.heapTotalDeltaMB} Mb`);
  console.log(`Heap used delta: ${carbon.memoryUsageInfo.heapUsedDeltaMB} Mb`);
  console.log(`Carbon consumption: ${carbon.carbonEmission} gCO2e/kWh`);
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
