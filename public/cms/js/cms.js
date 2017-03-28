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
    }).when('/', {
      templateUrl: 'views/_dash.html',
      controller: 'dashController'
      })
      .when('/dash', {
      templateUrl: 'views/_dash.html',
      controller: 'dashController'
      })
      .otherwise('/', {
      templateUrl: 'views/_dash.html',
      controller: 'dashController'
    })
 }]);

//On run of the app check for user
cmsApp.run(['Auth', '$cookieStore', '$rootScope','$location', function run(Auth, $cookieStore, $rootScope, $location) {
          $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            $location.path('/login');
          // event.preventDefault();
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
cmsApp.service('UserDetails', ['$cookieStore', function ($cookieStore) {
  var user = {
  
  }
   this.setDetails = function (fn, ln, em, k) {
     user.fn = fn;
     user.ln = ln;
     user.em = em;
     user.k = k;
     return $cookieStore.put('cms.usr.details', user);
  }
   this.getDetails = function () {
     return $cookieStore.get('cms.usr.details');
  }
}]);
//General login helper
 var LOGIN_STATE = {
   LOGIN_MSG: "Hello",
   LOGIN_SUB_MSG: "Please sign in to continue",
   BTN_BUSY: "Working...",
        BTN_TEXT: "Sign in",
        TEXT_INVALID: "Invalid username or password",
        TEXT_SUB_INVALID: "Please try again",
        ERROR: "An error has occured"
    };