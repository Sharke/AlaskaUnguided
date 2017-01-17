angular.
  module('randomFact').
  component('fact', {
    template: '{{$ctrl.fact}}',
    controller: function FaceController($http) {
      var self = this;
      $http.get('http://localhost:8080/api/fact/random').then(function(response) {
        
       self.fact = response.data;
      });
    }
  });