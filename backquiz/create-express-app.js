const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');

function createExpressApp(database){
    const app = express();

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-type, Accept');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

    app.use(bodyParser.json());
    app.use('/api', apiRouter(database));

    return app;
}

module.exports = createExpressApp;