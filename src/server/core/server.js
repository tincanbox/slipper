
module.exports = function Server(app){

  this.instance = null;

  this.listen = function(){
    return FM.fn.promise(FM.fn.proxy(function(r){
      //this.instance = require('http').Server(app.express);
      //this.instance.listen(app.config.server.port, function(){
      //  console.log('Listening: ' + app.config.server.port);
      //  r(this.instance);
      //});

      this.instance = app.express.listen(app.config.server.port, FM.fn.proxy(function () {
        var host = this.instance.address().address;
        var port = this.instance.address().port;
        console.log('[core/server] Example app listening at http://%s:%s', host, port);
        r(this.instance);
      }, this));
    }, this));
  }

}
