define(function () {
  return Backbone.View.extend({
    el: '#display',
    events: {
      'click .arrow.left': 'left',
      'click .arrow.right': 'right'
    },
    initialize: function () {
      var self = this;
      _.bindAll(this);
      this.$('.arrow').hide();
      Backbone.Events.bind('photosDisplay', this.renderPhotos);
      $(window).resize(function () {
        self.positionPhoto($(self.el).children('.disp-photo').eq(self.index));
      });
    },
    renderPhotos: function (photos) {
      this.photos = photos;
      this.index = 0;
      $(this.el).children('.disp-photo').remove();
      this.$('.arrow').show();
      var template = _.template($('#photo-display').html());
      var frag = document.createDocumentFragment();
      _(photos).each(function (photo) {
        frag.appendChild($(template(photo))[0]);
      });
      $(this.el).append(frag);
      $(this.el).find('.disp-photo').hide();
      this.showPhoto();
      return this;
    },
    showPhoto: function () {
      var $photos = $(this.el).children('.disp-photo');
      $photos.hide();
      var $currPhoto = $photos.eq(this.index);
      $currPhoto.show();
      this.positionPhoto($currPhoto);
    },
    left: function () {
      this.scrollDisplayViewTop();
      this.moveIndex(-1);
      this.showPhoto();
    },
    right: function () {
      this.scrollDisplayViewTop();
      this.moveIndex(1);
      this.showPhoto();
    },
    positionPhoto: function ($photo) {
      var $window = $(window);
      var windowHeight = $window.height();
      var windowWidth = $window.width();
      var photoWidth = $photo.data('width');
      var photoHeight = $photo.data('height');
      if (photoWidth >= photoHeight) { // or replace with screen ratio comparison
        $photo.css({
          left: 'auto',
          top: photoHeight > windowHeight ? -1 * ((photoHeight - windowHeight) / 2) : (windowHeight - photoHeight) / 2,
          width: '100%',
          height: 'auto'
        });
      } else {
        var newWidth = (photoWidth * windowHeight) / photoHeight;
        $photo.css({
          left: (windowWidth - newWidth) / 2,
          top: 0,
          width: 'auto',
          height: windowHeight
        });
      }
    },
    scrollDisplayViewTop: function () {
      window.scrollTo(0, $(this.el).offset().top);
    },
    moveIndex: function (move) {
      if (this.index + move == this.photos.length) {
        this.index = 0;
      } else if (this.index + move < 0) {
        this.index = this.photos.length - 1;
      } else {
        this.index = this.index + move;
      }
    }
  });
});