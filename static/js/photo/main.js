require({
  paths: {
    'order': '/js/order',
    'text': '/js/text',
    'wrap': '/js/wrap',
    'tmpl': '/js/tmpl',
    'css': '/js/css',
    'webstack': '/js/webstack',
    'underscore': '/js/vendor/underscore',
    'backbone': '/js/vendor/backbone',
    'handlebars': '/js/vendor/handlebars'
  },
  wrapJS: {
    'backbone': {
      deps: ['underscore'],
      attach: 'Backbone'
    }
  }
}, ['require', 'webstack'], function (require) {
  require(['DisplayView', 'AlbumSliderView'], function (DisplayView, AlbumSliderView) {
    new DisplayView();
    var albumSliderView = new AlbumSliderView();
    albumSliderView.fetchForUser('112752247658360268564');
  });
});