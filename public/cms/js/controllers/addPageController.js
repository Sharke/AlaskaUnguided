cmsApp.controller('addPageController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', '$timeout','LoadAllTrips', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails, $timeout, LoadAllTrips) {
    $scope.user = UserDetails.getDetails(); 
          $scope.goTo = function (page) {      
        $location.path("/" + page);
    }
     $scope.tinymceModel = 'Trip description goes here';

      $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: false,
    plugins : 'autolink link image media lists preview emoticons',
    skin: 'lightgray',
    theme : 'modern'
  };
}]);