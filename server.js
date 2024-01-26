// Add required packages
const express = require('express');
const fs = require('fs');
const path = require('path');

const database = require('./db/db.json');
const { stringify } = require('querystring');

// Create Port
const PORT = process.env.PORT || 3001;
// Create app
const app = express();

// Middleware to use public folder
app.use(express.static('public'));

// Middleware to parse incoming data as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set routes for landing page and notes page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Set routes for get and post apis to the DB
app.get('/api/notes', (req, res) => {
    res.json(database);
});
app.post('/api/notes', (req, res) => {
    res.json(database);
});

// Create app listner
app.listen(PORT, () => {
    console.log(`Now listening on Port http://localhost:${PORT}`);
});