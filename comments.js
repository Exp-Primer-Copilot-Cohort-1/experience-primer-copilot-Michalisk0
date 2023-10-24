// Create web serwer for comments
// ==========================================================

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create web server
var app = express();

// Configure web server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Handle GET request
app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Handle POST request
app.post('/comments', function(req, res) {
    fs.readFile(__dirname + '/public/comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.send(JSON.stringify(comments));
        });
    });
});

// Start web server
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
