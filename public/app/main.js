
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
    .otherwise('/', {
      templateUrl: '../views/home.html',
      controller: 'homeController'
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
auApp.controller('searchResultCardController', ['$scope', '$http', '$log', function($scope, $http, $log) {
  $scope.tripNames = ['Alaska Highway', 'Alaskan Northern Lights', 'Fatbiking in Anchorage', 'Floatplaning in Alaska'];
  
$http.get('/app/data.json').then(function (response) {
   $scope.cardObjects = response.data;  
  });
  
 
   $scope.getCards = function() {
     return $scope.cardObjects;
   }

//Set the initial limit value of results 
$scope.lim = 8;

//Set base api url
$scope.baseApi = "/app/data.json";

$scope.loadMoreTrips = function () {
  //add logic to hide button
  return $scope.lim += 5;
}

//Trip search method
$scope.tripSearch = function () {
  if($scope.aSearch !== null) {
    
  }
}

}]);
//Components
auApp.component('auHeader', {
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><a href="#/"><img src="img/au__lg.png"></a></li><li class="menu__au m">MENU</li><li><a href="search">Find</a></li><li>Accomodation</li><li><a href="#!/search">Trips</a></li></ul></nav></header>',
  controller: function headerController($scope) { 
  }
});

auApp.directive('resultCard', function() {
  return {
    template: '',
    controller: searchResultCardController
  }
});
