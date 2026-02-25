// Import the 'http' module to create the web server
const http = require('http');

// Import the 'fs' (File System) module to read files from the computer
const fs = require('fs');

// Import the 'url' module to parse the address (URL) of the request
const url = require('url');

// Create the server instance
// The callback function runs whenever a user makes a request to the server
http.createServer(function(request, response){

    // Parse the incoming request URL to get the specific path name
    // Example: if URL is 'localhost:8080/index.html', pathname becomes '/index.html'
    const pathname = url.parse(request.url).pathname;

    // Log the requested path to the server's console for debugging
    console.log(`Request for ${pathname} received!`);

    // Read the requested file from the file system
    // pathname.substring(1) removes the leading '/' (e.g., converts "/index.html" to "index.html")
    // to match the file path relative to this script
    fs.readFile(pathname.substring(1), function(err, data){

        if (err){
            // --- ERROR BLOCK (File not found) ---
            
            // Log the error details to the server console
            console.log(err.stack);

            // Send HTTP Status 404 (Not Found) to the browser
            response.writeHead(404, {'content-type':'test/html'});

            // Send a text message to the body of the page and close the connection
            response.end("404 not found");

        } else{
            // --- SUCCESS BLOCK (File found) ---

            // Send HTTP Status 200 (OK) to the browser indicating success
            response.writeHead(200, {'content-type':'test/html'});

            // Write the file data (content) to the response body
            // (Corrected: added '()' to convert the buffer to a string)
            response.write(data.toString());

            // End the response, signaling that all data has been sent
            response.end();
        }
    });

// Make the server listen on port 8080
}).listen(8081);

// Optional: Log a message to know the server started successfully
console.log('Server running at http://127.0.0.1:8081...');