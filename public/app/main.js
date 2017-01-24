//Declare our app
var auApp = angular.module('au-app', ['randomFact', 'ngRoute']);

auApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'searchController'
    })
});

auApp.controller('homeController', ['$scope', '$http', function($scope, $http) {

}]);

auApp.component('auHeader', {
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><img src="img/au__lg.png"></li><li class="menu__au m">MENU</li><li>Recommendations</li><li>Accomodation</li><li>Trips</li></ul></nav></header>',
  controller: function headerController($scope) {

  }
});