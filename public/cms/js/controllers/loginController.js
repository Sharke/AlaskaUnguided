cmsApp.controller('loginController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth) {
    $scope.busy = false;
    $scope.isInvalid = false;
    $scope.loginMessage = "Hello";
    $scope.login = function () {
        $scope.busy = true;
        $scope.ph = Sha256.hash($scope.pword);
        $scope.payload = {u: $scope.uname, p: $scope.ph};
        //This needs to be a http request 
        $log.info("data to send: " + $scope.payload);
        $http.post('/api/authenticate/login', $scope.payload).then(function(res){
            if (res.data == Sha256.hash($scope.uname +";" + $scope.pword)) {
                //alert("Valid user");
                Auth.setUser(res.data);
                $location.path('/dash');
            } else {
              //  alert("Invalid login");
                $scope.isInvalid = true;
                $scope.loginMessage = "Incorrect username or password";
                $log.debug(res.data);
                $log.debug(Sha256.hash($scope.payload));
            }
        }).then(function (data) {
            $log.error(data);
            //if API post was unsuccessful
            });

    }
    $scope.get = function () {
        $log.debug($cookieStore.get('cms.usr'));
    }
    
}]);