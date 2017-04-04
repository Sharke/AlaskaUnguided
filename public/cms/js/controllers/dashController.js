cmsApp.controller('dashController', ['$window', '$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', '$timeout','LoadAllTrips', function ($window, $scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails, $timeout, LoadAllTrips) {
   
   //Get user datails from the UserDetails service 
    $scope.user = UserDetails.getDetails(); 
    //Set busy boolean to false
    $scope.isBusy = true;
    //Load trips service to get all trip data from API
     LoadAllTrips.async().then(function(d) {
     $scope.trips = d;
     $scope.isBusy = false;
    });    
    
      $scope.goTo = function (page) {      
        $location.path("/" + page);
      }
}]);