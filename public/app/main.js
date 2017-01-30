
//Declare our app
var auApp = angular.module('au-app', ['randomFact', 'ngRoute']);

//Routing
auApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'homeController'
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: 'searchController'
    })

});

//Controllers
auApp.controller('homeController', ['$scope', '$http','$log', function($scope, $http, $log) {

  $scope.slider = $('.landing__featured__trips__au');
    $scope.slider.unslider({
      autoplay: true,
      speed: 300,
      delay: 5000,
      infinate: true,
      arrows:false
    });

}]);

auApp.controller('searchController', ['$scope', '$http', function($scope, $http) {
  
}]);
auApp.controller('searchResultCardController', ['$scope', '$http', function($scope, $http) {
  
}]);

auApp.directive('resultCard', function() {
  return {
    template: '',
    controller: searchResultCardController
  }
}
//Components
auApp.component('auHeader', {
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><a href="#/"><img src="img/au__lg.png"></a></li><li class="menu__au m">MENU</li><li><a href="search">Find</a></li><li>Accomodation</li><li><a href="#!/search">Trips</a></li></ul></nav></header>',
  controller: function headerController($scope) { 
  }
});