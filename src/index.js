let express = require('express')
let app = express()
let fs = require('fs')
let path = require('path')
let https = require('https')
let http = require('http')
let relativePath = path.join(__dirname)

let privateKey = fs.readFileSync(path.join(__dirname, '../certificate/private.pem'), 'utf8')
let certificate = fs.readFileSync(path.join(__dirname, '../certificate/csr.crt'), 'utf8')
let cert = {
  key: privateKey,
  cert: certificate
// This is necessary only if using the client certificate authentication.  
// requestCert: true,
// rejectUnauthorized: true
// passphrase:'test',  
// This is necessary only if the client uses the self-signed certificate.  
// ca: [ fs.readFileSync('../key/ca-cert.pem') ]  
}
let httpServer = http.createServer(app)
let httpsServer = https.createServer(cert, app)

app.get('/', function (req, res) {
  if (req.protocol === 'https') {
    res.send('https require')
  } else {
    res.send('http require')
  }
})
httpServer.listen(3000, '127.0.0.1', function () {
  console.log('HTTP Server is running at http://127.0.0.1:3000')
})
httpsServer.listen(3001, '127.0.0.1', function () {
  console.log('HTTPS Server is running at https://127.0.0.1:3001')
})

// var https = require('https')
// var fs = require('fs')

// var options = {
//   pfx: fs.readFileSync('../certificate/server.pfx'),
//   passphrase: 'your password'
// }

// https.createServer(options, function (req, res) {
//   res.writeHead(200)
//   res.end('hello world\n')
// }).listen(3000, '127.0.0.1')
