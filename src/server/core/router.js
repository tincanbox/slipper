
module.exports = function Router(app){


  var RouterTransactionState = function(o){
    this.called = "";
    this.matched = [];
    this.template = "";
  }


  function trim_query(path){
    return ((path || "").split("?").shift().replace(/\.html$/, ""))
  }


  this.path = function(url){
    var p = url;
    p = p.split("?").shift().replace(/\.html$/, "");
    p = p.split("#").shift();
    return p;
  }


  this.callable = function(url){
    var p = trim_query(url);

    if(p.match(/\/$/))
      p += app.config.server.default_index;

    p = p.replace(/^\//, '');

    return (!p.length) ? app.config.server.default_index : p;
  }


  this.query_parse = function(url){
    if(!url) return {};

    var match
    ,pl     = /\+/g
    ,search = /([^&=]+)=?([^&]*)/g
    ,decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }
    ,query  = (url.match(/\?/)) ? url.split('?').pop().split("#").shift() : ""
    ,param  = {}
    ;

    while (match = search.exec(query))
      param[decode(match[1])] = decode(match[2]);

    return param;
  }


  this.guide = function(url){

    var has_config = false;
    var o = new RouterTransactionState;
    var regexp = null;

    o.view     = this.callable(url);
    o.called   = o.view;
    o.template = o.view;
    o.param    = this.query_parse(url);
    o.option   = {
      snapshot: false
    };

    FM.ob.each(app.config.route, function(v, k){
      if(has_config){ return; }

      regexp = new RegExp('^('+k+')');

      if(!FM.ar.has(o.matched, k) && regexp.test(o.view)){
        if(FM.ob.has(v, 'view') && v.view){
          o.view = v.view;
        }
        if(FM.ob.has(v, 'template') && v.template){
          o.template = v.template;
        }
        if(FM.ob.has(v, 'param')){
          o.param = (typeof v.param === 'function'
                  ? v.param(o.param)
                  : v.param);
          console.log(o.param);
        }
        o.matched.push(k);
        has_config = true;
      }
    });

    return o;
  }


}
