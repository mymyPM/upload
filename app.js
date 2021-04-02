const express = require('express');
//const upload = require('express-fileupload');
const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");


// Set up the express app
const app = express();

// Log requests to the console.
app.use(express.json());
app.use(morgan('dev'));
//app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./server/routers")(app);
app.listen(port,() => {
    console.log(`App is live on port ${port}`);
    })
app.get('*',(req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;