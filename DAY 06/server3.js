// ---------------------- IMPORT MODULES ----------------------
var express = require('express');  // Import Express framework
var app = express();               // Create an Express app instance

// ---------------------- ROUTES ----------------------

// Route: GET request to root URL "/"
// Serves the HTML file with the form
app.get('/', function (req, res) {
    // __dirname gives the current folder path
    // sendFile sends the index.html file to the browser
    res.sendFile(__dirname + "/index2.html");
});

// Route: GET request to "/process_get"
// Handles form submission sent via GET method
app.get('/process_get', function (req, res) {
    // req.query contains the query parameters from the URL
    // Example URL: /process_get?fname=John&lname=Doe
    var response = { 
        fname: req.query.fname,  // Get first name from query
        lname: req.query.lname   // Get last name from query
    };

    console.log(response); // Print the submitted data in server console

    // Send the response back to browser as JSON
    res.json(response);
});

// ---------------------- START SERVER ----------------------
var server = app.listen(5000, function () {
    console.log('Node server is running on port 5000..');
});