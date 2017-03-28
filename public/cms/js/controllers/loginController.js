cmsApp.controller('loginController', ['$scope', '$http', '$log', '$rootScope', '$location', function ($scope, $http, $log, $rootScope, AuthenticationService) {
    $scope.login = function () {
        AuthenticationService.login($scope.uname, $scope.pword, function (res) {
            
        });
    }
}]);