// ---------------------- IMPORT MODULES ----------------------
var express = require('express');      // Import Express framework
var bodyParser = require("body-parser"); // Import body-parser to parse form data

// ---------------------- CREATE APP ----------------------
var app = express();  // Create an Express app instance

// ---------------------- MIDDLEWARE ----------------------
// Middleware to parse URL-encoded form data (from HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// ---------------------- ROUTES ----------------------

// GET request to root URL
// Serves the HTML form (index.html) when user visits http://localhost:5000/
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html'); // __dirname ensures correct file path
});

// POST request to '/submit-student-data'
// Handles form submission
app.post('/submit-student-data', function (req, res) {
  // req.body contains the submitted form data
  var name = req.body.firstName + ' ' + req.body.lastName;

  // Respond to user confirming submission
  res.send(name + ' Submitted Successfully!');
});

// ---------------------- START SERVER ----------------------
var server = app.listen(5000, function () {
  console.log('Node server is running on port 5000..');
});