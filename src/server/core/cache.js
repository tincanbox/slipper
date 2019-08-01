
module.exports = function Cache(app){

  this.write = function(path, content){
    return FM.fn.promise(function(res, rej){
      app.includes.fs.writeFile(app.config.path.server + 'cache/' + path, content, function(e, r){
        ((e) && rej(e)) || res(r);
      });
    });
  }

}
