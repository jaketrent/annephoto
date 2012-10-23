define(function () {
  return Backbone.Model.extend({
    initialize: function () {
      _.bindAll(this);
    },
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
        var self = this;
        var photos = [];
        _(body.feed.entry).each(function (photo) {
          photos.push({
            url: self.mkPhotoUrl(photo),
            height: photo.gphoto$height.$t,
            width: photo.gphoto$width.$t,
            thumb: photo.media$group.media$thumbnail[0].url
          });
        });
        return {
          photos: photos
        }
      }
    },
    mkPhotoUrl: function (photo) {
      var path = photo.content.src;
      var title = path.split('/').pop();
      return path.substr(0, path.indexOf(title)) + 's' + this.getPhotoSize(photo) + '/' + title;
    },
    getPhotoSize: function (photo) {
      var maxPhotoWidth = photo.gphoto$width.$t;
      var size = 320;
      if (this.get('windowWidthAtAlbumLoad') <= maxPhotoWidth) {
        size = this.get('windowWidthAtAlbumLoad');
      } else {
        size = maxPhotoWidth;
      }
      return size;
    }
  });
});