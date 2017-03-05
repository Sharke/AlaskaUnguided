
//Declare our app
var auApp = angular.module('au-app', ["ngRoute", "ngAnimate"]);
//test
//Routing
auApp.config(function($routeProvider, $locationProvider) {
 $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: 'searchController'
    })
        .when('/activity', {
      templateUrl: '/views/search.html',
      controller: 'searchController'
    })
            .when('/activity/:tripId', {
      templateUrl: '/views/activity.html',
      controller: 'activityController'
    })
    .otherwise('/', {
      templateUrl: 'views/home.html',
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
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><a href="#/"><img src="img/au__lo.png"></a></li><li class="menu__au m"><i class="fa fa-bars"></i></li><li><a href="search">Contact</a></li><li><a>Blog</a></li><li><a href="#/search">Trip Search</a></li></ul></nav></header>',
  controller: function headerController($scope) { 

  }
});
//Background image directive
auApp.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
            'background-position': 'center center'
        });
    };
});