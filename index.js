// Package initiations & variable definitions

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; //define the listener port


// Initiate bodyParser to read JSON-formatted messages

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
// Defining the name of listener after "/"

  console.log('Received Webhook Event Msg:', req.body) // Action on the request that will be printed out in terminal

  res.status(200).end('OK') // Responding when needed
})


app.listen(port, () => {
// activating the listener on predefined port
    console.log(`App is listening on port ${port}`)
// Printing out the status of when calling the listener
  })