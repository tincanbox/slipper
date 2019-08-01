
module.exports = function Loader(app){

  this.include = function(files){
    return FM.fn.swear(files.reduce(function(m, n){
      m.push(FM.fn.promise(function(resolve, reject){
        app.includes.fs.readFile(
          (n.match(/^\//))
            ? n
            : app.includes.path.resolve(app.config.path.server + '/' + n
        ), 'utf8', function(err, data){
          ((err) && reject(err)) || ((data) && resolve(data));
        });
      }));
      return m;
    }, []));
  }

}
