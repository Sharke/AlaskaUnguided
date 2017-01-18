angular.
  module('randomFact').
  component('fact', {
    template: '{{$ctrl.fact}}',
    controller: function FaceController($http) {
      var self = this;
      $http.get('/api/fact/random').then(function(response) {
        var str = angular.fromJson(response.data);
       self.fact = str[0].fact;
      });
    }
  });