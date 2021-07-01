'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet()); //middlewear for security

const morgan = require('morgan');
const logger = morgan('tiny');//middlewear for logging
app.use(logger);

app.use(express.json()); // adding form information
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));// middlewear for using static assets, front end stuff like css and images

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});

const rootController = require('./routes/index');

app.use('/', rootController);