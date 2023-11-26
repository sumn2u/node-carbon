// Import the '@felipebutcher/node-os-info' library to get information about the operating system
import nodeOsInfo from '@felipebutcher/node-os-info';

// Import the 'net' module to create a TCP server and client
import net from 'net';

// Choose an available port for the server
const port = 8080;

// Set the size of the data to be sent in bytes (3MB in this case)
const dataSize = 3 * 1024 * 1024;

// Allocate a buffer to hold the data to be sent
const data = Buffer.alloc(dataSize, '0');

// Function to get and log memory usage information
const getMemoryUsage = () => nodeOsInfo.mem(memory => {
    console.log("Memory usage: " + Math.round(memory * 100) + "%");
});

// Function to get and log CPU usage information
const getCPUUsage = () => nodeOsInfo.cpu(cpu => {
    console.log("CPU usage: " + Math.round(cpu * 100) + "%");
});

// Function to get and log disk usage information
const getDiskUsage = () => nodeOsInfo.disk(disk => {
    console.log("Disk usage: " + Math.round(disk * 100) + "%");
});

// Create a TCP server that listens for incoming connections
const server = net.createServer((socket) => {
    // Event listener for when data is received from the client
    socket.on('data', async (data) => {
        // Measure and log resource usage (CPU, memory, disk)
        await getCPUUsage();
        await getMemoryUsage();
        await getDiskUsage();
        console.log(`Received data: ${data.toString()}`);
    });

    // Event listener for when the client closes the connection
    socket.on('end', () => {
      console.log('Data transfer complete');
      socket.end();
    });
});

// Start the server and log a message when it is listening on the specified port
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  
    // Create a TCP client connection to the server
    const client = net.createConnection(port);
  
    // Send the data to the server
    client.write(data);
  
    // Close the client connection
    client.end();
});
