define(function () {
  return Backbone.View.extend({
    el: '#albums-tgl',
    events: {
      'click': 'hideTgl'
    },
    initialize: function () {
      _.bindAll(this);
      Backbone.Events.bind('albumClick', this.showTgl);
      $(this.el).hide();
    },
    showTgl: function () {
      $(this.el).show();
    },
    hideTgl: function () {
      $(this.el).hide();
      Backbone.Events.trigger('albumTglClick');
    }
  });
});