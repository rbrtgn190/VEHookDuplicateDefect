// Package initiations & variable definitions

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000; //define the listener port


// Read the key and certificate files.
let key = fs.readFileSync('keys/private.key');  // <<<<<<<<<<<<<<<<<<<<<<
let cert = fs.readFileSync('keys/certificate.crt');

let options = {                                         // <<<<<<<<<<<<<<<<<<<<<<
  key: key,
  cert: cert
};

// Initiate bodyParser to read JSON-formatted messages

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
// Defining the name of listener after "/"

  console.log('Received Webhook Event Msg:', req.body) // Action on the request that will be printed out in terminal

  // Parse the id from the username object
  const usernameId = req.body.username.id;
  console.log(`Username ID: ${usernameId}`);

  // Parse the id from the entity object inside the data array
  const entityId = req.body.data[0].entity.id;
  console.log(`Entity ID: ${entityId}`);

    // Parse the name from the entity object inside the data array
    const entityName = req.body.data[0].entity.name;
    console.log(`Entity ID: ${entityName}`);

  res.status(200).end('OK') // Responding when needed
})

// Create an HTTPS service.
let server = https.createServer(options, app);          // <<<<<<<<<<<<<<<<<<<<<<
server.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});

/*
app.listen(port, () => {
// activating the listener on predefined port
    console.log(`App is listening on port ${port}`)
// Printing out the status of when calling the listener
  })
*/