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
$ curl -X POST -H "Content-Type: application/json" -d '{"event":"test", "data": {"message": "Hello, World!"}}' http(s)://localhost:3000/webhook


==== to generate self-signed certificate
openssl genrsa -out private.key 2048
openssl req -new -sha256 -key private.key -out certificate.csr
openssl x509 -req -days 3650 -in certificate.csr -signkey private.key -out certificate.crt