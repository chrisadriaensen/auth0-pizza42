//Install express server
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist'));

var jwtCheck = jwt({
   
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://go-pizza42.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://pizza42-auth0.herokuapp.com/api/',
  issuer: 'https://go-pizza42.eu.auth0.com/',
  algorithms: ['RS256']

});

app.use('/api/*', jwtCheck);

app.get('/api/orders', function(req, res) {
  
  var orders = [
    { id: 1, type: 'Margherita'},
    { id: 2, type: 'Quatro Fromaggio'}
  ];

  res.json(orders);

});

app.post('/api/orders', function(req, res) {

  var order = { id:3, type: 'Funghi' };

  res.json(order);

});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
