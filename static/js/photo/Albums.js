define(['Album'], function (Album) {
  return Backbone.Collection.extend({
    model: Album,
    initialize: function () {
      _.bindAll(this);
    },
    setUserId: function (userId) {
      this.userId = userId;
    },
    url: function () {
      return 'http://picasaweb.google.com/data/feed/api/user/' + this.userId + '?alt=json&callback=?';
    },
    parse: function (body) {
      var self = this;
      var albums = []
      _(body.feed.entry).each(function (album) {
        albums.push({
          id: album.gphoto$id.$t,
          cover: album.media$group.media$thumbnail[0].url,
          title: album.title.$t,
          userId: self.userId,
          windowWidthAtAlbumLoad: self.getCurrentWindowWidth()
        });
      });
      return albums;
    },
    getCurrentWindowWidth: function () {
      return $('body').width();
    }
  });
});