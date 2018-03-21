//Install express server
const express = require('express');
const app = express();
const path = require('path');

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/api/order', function(req, res) {
  
  var orders = [
    { id: 1, type: 'Margherita'},
    { id: 2, type: 'Quatro Fromaggio'}
  ];

  res.json(orders);

});

app.post('/api/order'), function(req, res) {

  var order = { id:3, type: 'Funghi' };

  res.json(order);

});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
