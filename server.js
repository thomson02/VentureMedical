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
        return;
    });
});

app.get('/', function(req, res) {
    fs.readFile('./app/index.html', 'utf8', function
        (err, data){
        if (err) {
            return console.log(err);
        }
        return res.end(_.template(data, { devmode: process.env.DEVMODE == "1" }));
    });
});

app.post('/deployed', function(req, res) {
    // authenticate
    var header=req.headers['authorization']||'',        // get the header
        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
        auth=new Buffer(token, 'base64').toString(),    // convert from base64
        parts=auth.split(/:/),                          // split on colon
        username=parts[0],
        password=parts[1];

    if (username === process.env.HOOK_USER && password === process.env.HOOK_PASS) {
        // update git sha1 in manifest file
        process.env.GIT_SHA = req.body.head_long || "NOT_SET";
    }

    res.end();
    return;
});

// Setup the server
// ================
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    console.log("DEV MODE: " + (process.env.DEVMODE == "1" ? "ON" : "OFF"));
});