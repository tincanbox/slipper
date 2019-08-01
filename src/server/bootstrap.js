
express = require('express');

(function(
  express_definition,
  express_instance
){

  var app = {};

  var express  = app.express  = express_instance;
  var socket   = app.socket   = require('socket.io');
  var includes = app.includes = {};
  var vendor   = app.vendor   = {};
  var config   = app.config   = {};
  var core     = app.core     = {};

  // Bootstrap application requirements.
  (function(){
    // Include
    ['fs', 'path', 'crypto'].map(function(n){
      app.includes[n] = require(n);
    });

    // Vendor
    _  = app.vendor._    = require('underscore/underscore');
    FM = app.vendor.FM   = require('./vendor/fmjs/fm');

    // Config
    ['app', 'server', 'route', 'path'].map(function(n){
      app.config[n] = require('./config/' + n) || {};
    });

    app.config.path.public = app.config.path.public || includes.path.resolve(__dirname + '/../public') + '/';
    app.config.path.server = app.config.path.server || __dirname + '/';
    app.config.path.client = app.config.path.client || includes.path.resolve(__dirname + '/../public/app') + '/';

    // Core
    ['server', 'loader', 'router', 'cache', 'response'].map(function(n){
      app.core[n] = new (require(app.config.path.server + 'core/' + n))(app);
    });

  })();


  // Express implements.
  (function(){
    express.use(express_definition.static(app.config.path.public));

    // Session
    (function(session){
      express.use(session({
        //genid: function(req) {
        //  return genuuid() // use UUIDs for session IDs
        //},
        secret: 'keyboard cat'
      }));
    })(require('express-session'));

    // Body parser
    (function(b){
      express.use(b.json());
      express.use(b.urlencoded({
        extended: true
      }));
    })(require('body-parser'));

  })();


  /*-----------------------------------
   * Routings
   *-----------------------------------
   *
   */

  // Asset requests.
  express.get('/' + app.config.server.asset_prefix.join('|') + '/*', app.core.response.send_asset_file);

  // Client component
  express.get('/'+ app.config.server.component_prefix.join('|') +'/*', app.core.response.send_component_file);

  // Snapshot
  express.post('/' + app.config.server.snapshot_url, app.core.response.receive_snapshot);

  // Whole routing.
  express.get('*', function(req, res){
    var r = '/' + app.config.server.adapter_url + '/(.*)';
    var rg = new RegExp(r);
    console.log("Matching Router configuration: " + r);
    console.log("  originalUrl: " + req.originalUrl);
    console.log("  result:      " + req.originalUrl.match(rg));
    req.originalUrl.match(rg)
      ? app.core.response.send_adapter_state(req, res)
      : app.core.response.send_default_response(req, res)
      ;
  });


  // Start server instance.
  app.core.server.listen().then(function(){
    app.socket = app.socket(app.core.server.instance);
    app.socket.on('connection', function(sock){
      console.log('socket.io connected');
    });
  });


})(express, express());
