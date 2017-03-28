cmsApp.controller('loginController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth) {
    $scope.busy = false;
    $scope.isInvalid = false;

    $scope.login = function () {
        $scope.busy = true;
        $scope.payload = {u: $scope.uname, p: Sha256.hash($scope.pword)};
        //This needs to be a http request 
        $http.post('/api/authenticate/login', $scope.payload, function(res){
            if (res.data == Sha256.hash($scope.payload)) {
                alert("Valid user");
                Auth.setUser(res.data);
            } else {
                $log.debug(res.data);
                $log.debug(Sha256.hash($scope.payload));
            }
        }).then(function (data) {
            $log.error(data);
            //if API post was unsuccessful
            });
        
        if($scope.uname == "CONOR" && $scope.pword == "CONOR"){
            
            alert();
        }else{
            
        }
    }
    $scope.get = function () {
        $log.debug($cookieStore.get('cms.usr'));
    }
    
}]);