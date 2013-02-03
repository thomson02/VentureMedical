/**
 * Module dependencies.
 */
var util = require('util');

var express = require('express')
    , api = require('./api')
    , http = require('http')
    , path = require('path')
    , _ = require('underscore')
    , fs = require('fs');

// Configure the App
// =================
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('v3ntur3'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'app')));
});

// Setup the Routes
// ================
app.get("/cache.manifest", function(req, res){
    fs.readFile('./app/cache.manifest', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        res.header("Content-Type", "text/cache-manifest");
        res.end(_.template(data, { githash: process.env.GIT_SHA }));
        return console.log(data);
    });
});

app.get('/', function(req, res) {
    fs.readFile('./app/index.html', 'utf8', function (err, data){
        if (err) {
            return console.log(err);
        }

        return res.end(_.template(data, { devmode: process.env.DEVMODE == "1" }));
    });
});

app.post('/deployed', function(req, res) {
    process.env.GIT_SHA = req.body.head_long || "NOT_SET";
    return;
});

// Setup the server
// ================
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    console.log("DEV MODE: " + (process.env.DEVMODE == "1" ? "ON" : "OFF"));
});