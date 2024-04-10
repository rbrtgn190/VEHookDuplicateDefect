# VEHookDuplicateDefect

Based on Tuto:
https://janhalas.com/how-to-create-listener-for-webhook-events-using-express-js-and-node-js/
https://reintech.io/blog/how-to-use-node-js-to-create-a-webhook-receiver 
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Octane/VE resources:
https://admhelp.microfocus.com/octane/en/23.4-24.1/Online/Content/AdminGuide/how-rules-webhook-listener.htm 
https://github.com/MicroFocus/alm-octane-webhooks-listener

Start your server by running:
$ node index.js

use a tool like Postman or cURL to send a POST request to your webhook receiver:
$ curl -X POST -H "Content-Type: application/json" -d '{"event":"test", "data": {"message": "Hello, World!"}}' http://localhost:3000/webhook

================================================================================

To make your Express application listen on HTTPS rather than HTTP, you need to create an HTTPS server. This requires an SSL certificate. Here's how you can modify your code:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');                     // <<<<<<<<<<<<<<<<<<<<<<
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  console.log('Received Webhook Event Msg:', req.body)
  res.status(200).end('OK')
})

// Read the key and certificate files.
let key = fs.readFileSync('path/to/your/private.key');  // <<<<<<<<<<<<<<<<<<<<<<
let cert = fs.readFileSync('path/to/your/certificate.pem');

let options = {                                         // <<<<<<<<<<<<<<<<<<<<<<
  key: key,
  cert: cert
};

// Create an HTTPS service.
let server = https.createServer(options, app);          // <<<<<<<<<<<<<<<<<<<<<<
server.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});
```

Please replace `'path/to/your/private.key'` and `'path/to/your/certificate.pem'` with the paths to your SSL certificate and private key files.

Remember, you need to have a valid SSL certificate for your domain. You can obtain one from a Certificate Authority (CA), or use a tool like [Let's Encrypt](https://letsencrypt.org/) to get a free SSL certificate. If you're just testing locally, you can generate a self-signed certificate, but browsers will show a warning when accessing your site. 

Also, please note that the port number might need to be changed to 443, which is the default port for HTTPS connections. However, this might require additional permissions on some systems. 

This is a basic example. Depending on your needs, you might want to add more options, handle errors, etc. Always make sure to secure your key and certificate files, and to keep them updated.