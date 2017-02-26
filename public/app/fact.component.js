angular.
  module('randomFact').
  component('fact', {
    template: '{{$ctrl.fact}}',
    controller: ['$http', '$scope', function ($http, $scope) {
      var self = this;
      $http.get('/api/fact/random').then(function(response) {
        var str = response.data[0].fact;
       self.fact = str;
       $scope.factLoaded = true;
       alert($scope.factLoaded);
      });
    }]
  });