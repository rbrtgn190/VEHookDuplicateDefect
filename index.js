// functions
function setDuplicateTrace(reqbody, duplicateddefect_id) {
  //Execute an update on the current defect (the copy) in oder to create the trace_from relation
  console.log('---- setDuplicateTrace')

  // Event Msg 
  //server_url: 'http://nimbusserver.aos.com:8085',
  let url = reqbody.server_url;
  //event_type: 'create', // TODO good event is there !!
  //sharedspace_id: 1001,
  let shared_space = reqbody.sharedspace_id;
  //workspace_id: 1002,
  let workspace = reqbody.workspace_id;

  
  // Get Source defect ID from duplicated defect comments
  let sourcedefect_id = '0' // TODO
  /*
    If the name starts with "Copy of" fetch the comments of the copied defect using the obtained ID using the following request:
  GET {{url}}/api/shared_spaces/{{shared_space}}/workspaces/{{workspace}}/comments?query="owner_work_item EQ {id EQ 2013}"&fields=text

       Example of response:
        {
          "total_count": 1,
          "data": [
                {
                  "type": "comment",
                  "workspace_id": 1002,
                  "id": "1011",
                  "text": "<html><body>Copy of <a href=\"/dev/ui/entity-navigation?p=1001/1002&amp;entityType=work_item&amp;id=2001\">Defect 2001 - zxcvvsxc</a></body></html>"
                }
          ],
          "exceeds_total_count": false
        } 
  Parse the text value of the comment in order to extract the original defect id
  */
 
  // payload
  let payload = `{"linked_items2": {"data": [{"id": ${sourcedefect_id},"type": "defect"}}}`;

  //PUT {{url}}/api/shared_spaces/{{shared_space}}/workspaces/{{workspace}}/defects/{{defect_id}}
  console.log(`PUT ${url}/api/shared_spaces/${shared_space}/workspaces/${workspace}/defects/${duplicateddefect_id}`)

  // TODO ? Check http return code from PUT request ? 
  

  throw new Error('NOTIMPLEMENTED');

}

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
console.log('-----------------------------------------------')
  
  // Extract query parameters from the URL
  const { test } = req.query;
  
  console.log('Received Webhook Event Msg URL:', req.url)  
  console.log("Test parameter value:", test);
  
  console.log('Received Webhook Event Msg:', req.body) // Action on the request that will be printed out in terminal

  if (test === "true") {
    // Do something when test is true
    console.log("This is a connection Test :-) !");
    //res.status(200).end('OK') // Responding when needed
  } else {

    try {
      
      // Parse the id from the username object
      const usernameId = req.body.username.id;
      console.log(`Username ID: ${usernameId}`);

      // Parse the id from the entity object inside the data array
      const entityId = req.body.data[0].entity.id;
      console.log(`Entity ID (duplicated defect ID): ${entityId}`);

      // Parse the name from the entity object inside the data array
      const entityName = req.body.data[0].entity.name;
      console.log(`Entity Name: ${entityName}`);

      // TODO : Call Octane to set the relationship...
      setDuplicateTrace(req.body, entityId);

      res.status(200).end('OK') // Responding when needed

    } catch (error) {
      console.error(error);
      res.status(500).end('ERROR')
    }
      
    //res.status(501).end('NOTIMPLEMENTED') // Error [ERR_STREAM_WRITE_AFTER_END]: write after end
   // res.status(200).end('OK') 
  }
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