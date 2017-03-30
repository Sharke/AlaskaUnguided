cmsApp.controller('dashController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', '$timeout','LoadAllTrips', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails, $timeout, LoadAllTrips) {
    $scope.user = UserDetails.getDetails(); 
    $scope.array = ["1", "2", "3", "4", "5","6"];
    $scope.isBusy = true;
    
    LoadAllTrips.async().then(function(d) {
     $scope.trips = d;
     $scope.isBusy = false;
     });
      
    
}]);