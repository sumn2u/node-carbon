import net from 'net';
import NodeCarbon from 'node-carbon';

const port = 8080; // Choose an available port
const dataSize = 3 * 1024 * 1024; // 3MB in bytes
const data = Buffer.alloc(dataSize, '0'); // Allocate a buffer for the data

// Create an instance of the NodeCarbon class
const nodeCarbon = new NodeCarbon();
await nodeCarbon.start();
const server = net.createServer(async (socket) => {
  socket.on('data', async (data) => {
    console.log(`Received data: ${data.toString()}`);
    const carbon = await nodeCarbon.stop();
    console.table({
      'CPU Usage (watts)': carbon.cpuUsageInfo.cpuUsage,
      'Total Time (s)': carbon.elapsedTime,
      'RSS Delta (Mb)': carbon.memoryUsageInfo.rssDeltaMB,
      'Heap Total Delta (Mb)': carbon.memoryUsageInfo.heapTotalDeltaMB,
      'Heap Used Delta (Mb)': carbon.memoryUsageInfo.heapUsedDeltaMB,
      'Carbon Consumption (gCO2e/kWh)': carbon.carbonEmission,
      'Carbon Consumption (gCO2e)': carbon.carbonEmission / 3600,
    });
  });

  socket.on('end', () => {
    console.log('Data transfer complete');
    socket.end();
  });
});


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  const client = net.createConnection(port);
  client.write(data); // Send the data
  client.end();
});
