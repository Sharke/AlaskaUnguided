
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
  $scope.lim = 1;

$scope.loadMoreTrips = function () {
  
  return $scope.lim += 5;
}
   
  
  //I am envisioning this:

  //Data returned from server is an array with objects in it
  //eg: [{tripdata}, {tripdata2}, {tripdata3}]
  // we will loop over the array length, which will give us 
  //the amount of cards to generate with ng-repeat
  //the HTML with ng-repeat attached will have handlebar variables
  //that pull data from the respective tripdata
  // eg: {{tripdata.tripheading}} will get the trip heading

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
