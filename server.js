//Install express server
const express = require('express');
const app = express();

// Serve only the static files from the dist directory
app.use(express.static(_dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);