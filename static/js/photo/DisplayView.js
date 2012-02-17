define(function () {
  return Backbone.View.extend({
    el: '#display',
    events: {
      'click .arrow.left': 'left',
      'click .arrow.right': 'right'
    },
    initialize: function () {
      _.bindAll(this);
      this.$('.arrow').hide();
      Backbone.Events.bind('photosDisplay', this.renderPhotos);
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
      $photos.eq(this.index).show();
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