(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'fact',
      template: '<h1>Hello Angular</h1>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
