
require('dotenv').config();
const express = require('express');
const router = require('./routes/routes.js');
const conn = require('./BD/config');

const app = express();

const port = process.env.port;

conn.init();

app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/app', router);

app.listen(port, ()=> console.log(`Servidor operando na porta ${port}`));