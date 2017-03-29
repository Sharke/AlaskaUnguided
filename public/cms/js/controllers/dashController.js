cmsApp.controller('dashController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails) {
    $scope.user = UserDetails.getDetails(); 
    $scope.array = ["1", "2", "3", "4", "5","6"];
}]);