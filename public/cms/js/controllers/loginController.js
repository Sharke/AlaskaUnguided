cmsApp.controller('loginController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth) {
    $scope.login = function() {
        $scope.payload = {};
        //This needs to be a http request 
        $http.post('/api/auth/', $scope.payload, function(res){
            //Logic if login was valid, if so, set the user cookie, if not, throw up UI error..
        }).then(function(){
            //if API post was unsuccessful
        });
        if($scope.uname == "CONOR" && $scope.pword == "CONOR"){
            Auth.setUser("CONOR");
            alert('ok');
        }else{
            
        }
    }
    $scope.get = function () {
        $log.debug($cookieStore.get('cms.usr'));
    }
    
}]);