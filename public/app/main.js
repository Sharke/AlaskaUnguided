
//Declare our app
var auApp = angular.module('au-app', ["ngRoute", "ngAnimate"]);

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
    .otherwise('/', {
      templateUrl: '../views/home.html',
      controller: 'homeController'
    })

});

//Controllers
auApp.controller('homeController', ['$scope', '$http','$log', '$animate', function($scope, $http, $log, $animate) {

  $scope.slider = $('.landing__featured__trips__au');
    $scope.slider.unslider({
      autoplay: true,
      speed: 300,
      delay: 5000,
      infinate: true,
      arrows:false
    });

}]);

//Components
auApp.component('auHeader', {
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><a href="#/"><img src="img/au__lg.png"></a></li><li class="menu__au m"><i class="fa fa-bars"></i></li><li><a href="search">Contact</a></li><li>Blog</li><li><a href="#!/search">Trip Search</a></li></ul></nav></header>',
  controller: function headerController($scope) { 

  }
});

