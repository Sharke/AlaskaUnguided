cmsApp.controller('addPageController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', '$timeout','LoadAllTrips', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails, $timeout, LoadAllTrips) {
    $scope.user = UserDetails.getDetails(); 
}]);