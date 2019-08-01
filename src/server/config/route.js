module.exports = {

  //---- Note ----
  //
  // As you know, in most of server side frameworks,
  // 'routing' is powerful solution to associate specific URL access to in-app functions.
  //
  // But, I recommend to make pair of 1 View and 1 Template.
  // Sometimes complexed routing may confuse you and others to find what you want.
  //
  // To construct a healthy application,
  // please reconsider about whether to use routing configuration or not, before to go deep into...
  //
  //
  //---- Usage ----
  //
  // Routing config must be
  //
  // Regex : {
  //   'path': 'overriding/view_and_template/path/string',
  //   'view': 'overriding/view/path/string',
  //   'template': 'overriding/template/path/string',
  //   'param': {
  //     'this_will_be': 'overridden.by.url.parameters'
  //   }
  // }
  //
  //
  // All pages will use '@layout/main' as View.
  // You don't need to create new views anymore.
  //
  // '(.*)+': {
  //   'view': '@layout/main'
  // }


  // If you want to use same view file for spefic URL accesses,
  // Override 'view' property with View include path.
  //
  // ex: In this case, all 'doc/' URLs except 'doc/sample' will use
  // 'doc/@layout/main.js' file as base-view.
  //
  // Thus, you can proxy all URL to some specific view files.
  // This is an enough, isn't it?
  //
  'doc/sample/action': {
    view: "doc/sample/action",
    param: function(p){
      p = FM.ob.merge(p, {time: 123});
      return p;
    }
  },

  'doc/(.*)': {
    view: "doc/@layout/main",
  }

}
