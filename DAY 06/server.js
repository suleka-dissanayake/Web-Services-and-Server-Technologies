// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// ---------------- ROUTES ----------------

// GET request to the root URL
// Sends an HTML response with <h1>Hello World</h1>
app.get('/', (req, res) => {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

// POST request to '/submit-data'
// Typically used to send data from client to server
app.post('/submit-data', (req, res) => {
  res.send('POST Request');
});

// PUT request to '/update-data'
// Typically used to update existing data on the server
app.put('/update-data', (req, res) => {
  res.send('PUT Request');
});

// DELETE request to '/delete-data'
// Used to delete data on the server
app.delete('/delete-data', (req, res) => {
  res.send('DELETE Request');
});

// ---------------- START SERVER ----------------

// Listen on port 5000 for incoming requests
const server = app.listen(5000, () => {
  console.log('Node server is running on port 5000..');
});