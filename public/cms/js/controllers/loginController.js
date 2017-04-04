cmsApp.controller('loginController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails) {
   
    $scope.state = LOGIN_STATE;
    $scope.loginMessage = LOGIN_STATE.LOGIN_MSG;
    $scope.loginSubMessage = LOGIN_STATE.LOGIN_SUB_MSG;
    $scope.btnText = LOGIN_STATE.BTN_TEXT;
    $scope.busy = false;
    $scope.isInvalid = false;

    $scope.login = function () {
        $scope.busy = true;
        $scope.btnText = LOGIN_STATE.BTN_BUSY;
        $scope.loginMessage = LOGIN_STATE.LOGIN_MSG_BUSY;
        $scope.loginSubMessage = $scope.uname;
        $scope.ph = Sha256.hash($scope.pword);
        $scope.payload = { u: $scope.uname, p: $scope.ph };
        
        //This needs to be a http request 
        $http.post('/api/authenticate/login', $scope.payload).then(function (res) {
            $log.debug(res.data);
            if (res.data.key == Sha256.hash($scope.uname +";" + $scope.pword)) {           
                Auth.setUser(res.data.key);
                UserDetails.setDetails(res.data.firstname, res.data.lastname, res.data.email, res.data.key);
                $scope.busy = false;    
                $location.path('/dash');
            } else {
                $scope.isInvalid = true;
                $scope.busy = false;
                $scope.loginMessage = LOGIN_STATE.TEXT_INVALID;
                $scope.loginSubMessage = LOGIN_STATE.TEXT_SUB_INVALID;
                $scope.btnText = LOGIN_STATE.BTN_TEXT;

            }
        })

    }

}]);