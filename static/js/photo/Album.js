define(function () {
  return Backbone.Model.extend({
    defaults: {
      thumbsize: '1024'
    },
    url: function () {
      return 'http://picasaweb.google.com/data/feed/api/user/' + this.get('userId') + '/albumid/' + this.get('id') + '?alt=json&thumbsize=' + this.get('thumbsize') + '&callback=?';
    },
    parse: function (body) {
      if (body.feed === undefined) {
        // from collection parse() as of backbone 0.9, is the album
        return body;
      } else {
        // from album call from server
        var photos = [];
        _(body.feed.entry).each(function (photo) {
          photos.push({
            url: photo.media$group.media$thumbnail[0].url
          });
        });
        return {
          photos: photos
        }
      }
    }
  });
});