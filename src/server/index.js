var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

const dotenv = require('dotenv');
dotenv.config();

var aylien = require("aylien_textapi");
var textapi = new aylien({
    application_id: "2a455759",
    application_key: "344937a5a2e27bc3cc37a13e2ae377d5"
});

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route
app.post('/analyze', (req, res) => {
    const { url } = req.body; // assuming you're sending a URL in the POST request
    console.log(`this is the url: ${url}`);
    if (!url) {
        return res.status(400).send({ error: 'URL is required' });
    }    
    textapi.sentiment({ url }, (error, response) => {
        if (error === null) {
            console.log('AYLIEN API Response:', response);
            res.send(response);
        } else {
            console.error('AYLIEN API Error:', error);
            res.status(500).send({ error: 'API request failed' });
        }
    });    
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


