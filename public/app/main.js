//Declare our app
var auApp = angular.module('au-app', ["ngRoute", "ngAnimate"]);
//Namespace so we dont pollute the global scope
var ALASKA_UNGUIDED_NS = ALASKA_UNGUIDED_NS || {};

//Define helper functions
ALASKA_UNGUIDED_NS.h = {
  uxtsToDate: function (timestamp, short) {
    return new Date(timestamp * 1000).toDateString();
  },
  isString: function(str) {
    return (typeof str == "string");
  },
  formatCost: function(c) {
    if(c == 1) return "$"
    if(c == 2) return "$$"
    if(c == 3) return "$$$"
    return "Unknown cost";
  },
  showNotif: function(msg) {
    var x = document.getElementById("snackbar")
    x.className = "show";
    x.textContent = msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  
};
//services
//newsletter
auApp.service('newsletter', function($http) {
  this.submitNewsletter = function (email) {
    var emailObj = {email: email};
    var config = {
                headers : {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
    return $http.post('/api/newsletter',emailObj, config).then(function(result) {
     // alert(result.data);
           return true;
       }, 
    function(response) { // optional
            return false;
    });
  }
});
//Routing
auApp.config(function ($routeProvider, $locationProvider) {
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

//Components & directives
auApp.component('auHeader', {
  template: ' <header><nav class="container clearfix"> <ul><li class="brand m"><a href="#/"><img src="img/au__lo.png"></a></li><li class="menu__au m"><i class="fa fa-bars"></i></li><li class="nav__contact"><a href="search">Contact</a></li><li><a href="#/search">Trip Search</a></li></ul></nav></header>',
  controller: function headerController($scope) {

  }
});
//Background image directive
auApp.directive('backImg', function () {
  return function (scope, element, attrs) {
    var url = attrs.backImg;
    element.css({
      'background-image': 'url(' + url + ')',
      'background-size': 'cover',
      'background-position': 'center center'
    });
  };
});

//Enter key suppressInfoWindows
auApp.directive('enterListen', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      var keyCode = event.which || event.keyCode;

      // If enter key is pressed
      if (keyCode === 13) {
        scope.$apply(function () {
          // Evaluate the expression
          scope.$eval(attrs.enterListen);
        });

        event.preventDefault();
      }
    });
  };
});

auApp.directive('routeLoadingIndicator', function($rootScope){
  return {
    restrict:'E',
    template:"<div class='au__loader ' ng-if='isRouteLoading'><div class='loader'> </div></div>",
    link:function(scope, elem, attrs){
      scope.isRouteLoading = false;

      $rootScope.$on('$routeChangeStart', function(){
        scope.isRouteLoading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function(){
        scope.isRouteLoading = false;
      });
    }
  };
});