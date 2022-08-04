const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./src/routes');

// const BlockChain = require('./src/data-components/blockchain');
// const chain = new BlockChain.Blockchain();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api', routes);

module.exports = app;


