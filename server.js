// Add required packages
const exp = require('constants');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create Port
const PORT = 3001;
// Create app
const app = express();

// Middleware to use public folder
app.use(express.static('public'));

// Set routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Create app listner
app.listen(PORT, () => {
    console.log(`Now listening on Port http://localhost:${PORT}`);
});