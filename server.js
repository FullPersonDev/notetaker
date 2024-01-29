// Add required packages
const express = require('express');
const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, 'db', 'db.json');
const { stringify } = require('querystring');

// Create Port
const PORT = 3001;
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
    //Read data from db.json and send it as the response
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});
app.post('/api/notes', (req, res) => {
    // Read existing notes from db.json
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        const notes = JSON.parse(data);

        // Add the new note to the notes array
        const newNote = req.body;
        notes.push(newNote);

        // Save the updated notes array back to db.json
        fs.writeFile(databasePath, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            // Send the updated notes array as the response
            res.json(notes);
        });
    });
});

// Create app listner
app.listen(PORT, () => {
    console.log(`Now listening on Port http://localhost:${PORT}`);
});