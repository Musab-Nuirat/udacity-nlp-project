var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();
var textapi = new aylien({
    application_id: process.env.API_ID, // Accesses the API_ID from the .env file
    application_key: process.env.API_KEY // Accesses the API_KEY from the .env file
});

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route
app.post('/analyze', (req, res) => {
    const { url } = req.body; // assuming you're sending a URL in the POST request

    textapi.sentiment({ url }, (error, response) => {
        if (error === null) {
            res.send(response);
        } else {
            res.status(500).send({ error: 'API request failed' });
        }
    });
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


