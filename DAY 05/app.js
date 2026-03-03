const express = require('express');
const app = express()
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(5000, function(){
    console.log("app.js is listening to http://localhost:5000/")
});