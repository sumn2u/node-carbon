import net from 'net';

const port = 8080; // Choose an available port
const dataSize = 3 * 1024 * 1024; // 3MB in bytes
const data = Buffer.alloc(dataSize, '0'); // Allocate a buffer for the data


const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(`Received data: ${data.toString()}`);
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
