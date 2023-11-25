import net from 'net';
import  { co2 } from "@tgwf/co2";

const port = 8080; // Choose an available port
const dataSize = 3 * 1024 * 1024; // 3MB in bytes
const data = Buffer.alloc(dataSize, '0'); // Allocate a buffer for the data
const co2Emission = new co2();
const isGreenHost = false; // Is the data transferred from a green host?
const options = {
  dataReloadRatio: 0,
  gridIntensity: {
    device: 379.26,
    dataCenter: { country: "USA" },
    networks: 1,
  },
};

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(`Received data: ${data.toString()}`);
    // Calculate carbon emissions using CO2.js
    const carbonEmissions = co2Emission.perByte(data.length, isGreenHost, options);
    console.log(`Carbon emissions for transferring ${data.length} bytes: ${carbonEmissions} gCO2e`);
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
