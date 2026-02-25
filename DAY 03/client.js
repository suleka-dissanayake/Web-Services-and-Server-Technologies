// Import the built-in Node.js 'http' module
// This module allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
const http = require('http');

// Define the configuration options for the request
const options = {
    host: 'localhost',  // The IP address or domain name of the server
    port: 8081,         // The port number the server is listening on
    path: '/test.html'  // The specific resource or file to request from the server
};

// Define a callback function to handle the response stream
// This function is executed once the connection is established and headers are received
const callback = function(response) {
    // Initialize an empty string to accumulate data chunks as they arrive
    let body = '';

    // Event Listener for 'data':
    // HTTP responses are streams, meaning data arrives in chunks (packets), not all at once.
    // This function runs every time a new chunk of data is received.
    response.on('data', function(data) {
        body += data; // Append the new chunk to our existing body string
    });

    // Event Listener for 'end':
    // This triggers when the server signals that it has finished sending data.
    response.on('end', function() {
        // Now that the stream is complete, log the full response
        console.log("response from server: ");
        console.log(body);
    });
}

// Initialize the HTTP request
// We pass the configuration 'options' and the 'callback' function defined above.
// Note: This does not send the request immediately; it returns a ClientRequest object.
const req = http.request(options, callback);

// Finalize and send the request
// req.end() signals to the server that the client has finished sending the request headers and body.
// Without this line, the request might hang waiting for more input.
req.end();