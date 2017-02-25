angular.
  module('randomFact').
  component('fact', {
    template: '{{$ctrl.fact}}',
    controller: function FaceController($http) {
      var self = this;
      $http.get('/api/fact/random').then(function(response) {
        var str = response.data[0].fact;
       self.fact = str;
      });
    }
  });