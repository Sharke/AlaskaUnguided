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
            .when('/add', {
      templateUrl: 'views/_add.html',
      controller: 'addPageController'
      })
      .otherwise('/', {
      templateUrl: 'views/_dash.html',
      controller: 'dashController'
    })
   //  $locationProvider.html5Mode(true);
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
    template:"<div class='load__wrap l-anim' ng-if='isRouteLoading'><div class='loader'> </div></div>",
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

cmsApp.directive('matchHeight', function(){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
      //$('.cards').matchHeight();
    }
  };
});

//Sign out directive
cmsApp.directive('signOut', ['Auth', '$location', function(Auth, $location){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
     $(elem).click(function(){
        scope.$apply(function() {
          scope.load = true;
            Auth.removeUser(); 
            $location.path('/login');
         return scope.load = false;
        })
     });
    }
  };
}]);
//New trip directive
cmsApp.directive('startNewTrip', function(){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
      $(elem).click(function() {
swal({
  title: "Create new trip",
  text: "Please select a trip type",
 
  showCancelButton: true,
  confirmButtonColor: "darkorchid",
  confirmButtonText: "Normal",
  cancelButtonText: "Sponsored",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
   swal({
  title: "New trip name",
  text: "Enter the new trip name",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  inputPlaceholder: "New trip..."
},
function(inputValue){
  if (inputValue === false) return false;
  
  if (inputValue === "") {
    swal.showInputError("Enter a trip name");
    return false
  }
  
  swal("Todo: take user to new trip details page");
});
  } else {
    
  }
});
      });
    }
  };
});
//get and set user details
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

cmsApp.service('LoadAllTrips', function($http) {
  var LoadAllTrips = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('/api/trip/search').then(function (response) {
        // The then function here is an opportunity to modify the response
        var temp  = [];
        for(var i = 0; i < response.data.length; i++){
            var obj = {'n': response.data[i].name.slice(0,16) + '...',
            'nl':  response.data[i].name,
            'sum': response.data[i].description.slice(0,36) + '...',
            'id': response.data[i]._id,
           'img': response.data[i].thumbnail};
            console.log(obj);
            temp.push(obj);
        }
        // The return value gets picked up by the then in the controller.
        return temp;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return LoadAllTrips;
});



//General login helper
 var LOGIN_STATE = {
   LOGIN_MSG: "Hello",
   LOGIN_SUB_MSG: "Please sign in to continue",
   LOGIN_MSG_BUSY: "Signing in...",
   BTN_BUSY: "Working...",
        BTN_TEXT: "Sign in",
        TEXT_INVALID: "Invalid username or password",
        TEXT_SUB_INVALID: "Please try again",
        ERROR: "An error has occured"
    };