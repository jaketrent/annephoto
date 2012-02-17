define(function () {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      'click img': 'fetchAlbum'
    },
    initialize: function () {
      _.bindAll(this);
    },
    render: function (template) {
      $(this.el).html(template(this.model.toJSON()));
      return this;
    },
    fetchAlbum: function () {
      this.model.fetch({
        success: this.showAlbum
      });
    },
    showAlbum: function () {
      Backbone.Events.trigger('photosDisplay', this.model.get('photos'));
      Backbone.Events.trigger('albumClick');
    }
  });
});