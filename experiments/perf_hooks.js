import net from 'net';
import { performance } from 'perf_hooks';

const port = 8080; // Choose an available port
const dataSize = 3 * 1024 * 1024; // 3MB in bytes
const data = Buffer.alloc(dataSize, '0'); // Allocate a buffer for the data

const start = performance.now();

const server = net.createServer(async (socket) => {
  socket.on('data', async (data) => {
    console.log(`Received data: ${data.toString()}`);
  });

  socket.on('end', () => {
    const end = performance.now();
    const time = end - start;
    console.log(`Data transfer took ${time} milliseconds`);
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

