define(['Albums', 'AlbumView'], function (Albums, AlbumView) {
  return Backbone.View.extend({
    el: '#sidebar',
    
    initialize: function () {
      _.bindAll(this);
      Backbone.Events.bind('albumClick', this.hideAlbums);
      Backbone.Events.bind('albumTglClick', this.showAlbums);
    },
    fetchForUser: function(userId) {
      this.collection = new Albums();
      this.collection.setUserId(userId);
      this.collection.fetch({
        success: this.renderAlbums
      });
    },
    renderAlbums: function () {
      var albumView = null;
      var frag = document.createDocumentFragment();
      var liTemplate = _.template($('#album-li').html());
      _(this.collection.models).each(function (album) {
        albumView = new AlbumView({
          model: album
        });
        frag.appendChild(albumView.render(liTemplate).el);
      });
      $(this.el).children('#albums').html(frag);
      //$('#albums').find('img').eq(0).click();
    },
    hideAlbums: function () {
      $(this.el).animate({
        left: 1024,
        opacity: 0
      });
    },
    showAlbums: function () {
      $(this.el).animate({
        left: 0,
        opacity: 1
      });
    }

  });
});