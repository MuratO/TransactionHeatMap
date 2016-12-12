// server.js

var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');


var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);

app.use('/static', express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9191;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/transactions')
    .post(function(req, res) {
        
        res.json({ message: 'ok!' });

        io.sockets.emit('super event', req.body);
        
    });

// default page
router.get('/', function(req, res) {   
    res.redirect('./static/index.html');
});

app.use('/', router);

//app.listen(port);
server.listen(port);