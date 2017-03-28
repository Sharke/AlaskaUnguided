var cmsApp = angular.module('cmsApp', ["ngRoute", "ngAnimate", "Auth", "ngCookies"]);
//Routing
cmsApp.config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider,  $httpProvider) {
  $locationProvider.hashPrefix('');
        // $urlRouterProvider.otherwise('/home');
     //   var interceptor = ['$location', '$q', function ($location, $q) {

     //       function success(response) {
     //           return response;
     //       }

     //       function error(response) {

     //           if (response.status === 401) {
      //              $location.path('/login');
      //              return $q.reject(response);
      //          }
     //           else {
      //              return $q.reject(response);
      //          }
     //       }

     //       return function (promise) {
     //           return promise.then(success, error);
     //       };
     //   }];

     //   $httpProvider.responseInterceptors.push(interceptor);
  $routeProvider
    .when('/login', {
      templateUrl: 'views/_login.html',
      controller: 'loginController'
      })
      .when('/dash', {
      templateUrl: 'views/_dash.html',
      controller: 'dashController'
      })
      .otherwise('/', {
      templateUrl: 'views/_login.html',
      controller: 'loginController'
    })
 }]);

//On run of the app check for user
cmsApp.run(['Auth', '$cookieStore', '$rootScope','$location', function run(Auth, $cookieStore, $rootScope, $location) {
          $rootScope.$on('$routeChangeStart', function (eve,nt) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/dash');
        }
    });
            
        }])

//Directives
cmsApp.directive('routeLoadingIndicator', function($rootScope){
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

