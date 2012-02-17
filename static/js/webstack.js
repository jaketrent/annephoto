define(
  [ 'wrap!backbone'
  ], function(){
    Modernizr.load({
      test: window.JSON,
      nope: '/js/vendor/json2.js'
    });

    Backbone.View.prototype.close = function() {
      //this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

    return { version: "1.0" };
});

