# Node Carbon

Calculate carbon footprints of current node process.

## Why?

Measuring the carbon footprint of node processes can be a valuable tool for businesses, organizations, and individuals who are looking to reduce their environmental impact and improve resource efficiency.

## How?

It estimates the electricity consumption of hardware (CPU+RAM) and applies the carbon intensity of the region where the computing is done.

## Installation and Usage

```bash
npm install node-carbon --save-dev
yarn add node-carbon --dev # or yarn
```

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
