cmsApp.controller('addPageController', ['$scope', '$http', '$log', '$rootScope', '$location', '$cookieStore', 'Auth', 'UserDetails', '$timeout','LoadAllTrips', 'SendTrip', function ($scope, $http, $log, $rootScope, $location, $cookieStore, Auth, UserDetails, $timeout, LoadAllTrips, SendTrip) {
    $scope.st = SendTrip;
    $scope.user = UserDetails.getDetails(); 
          $scope.goTo = function (page) {      
        $location.path("/" + page);
    }
     $scope.tinymceModel = 'ng-bind-html will format HTML';

      $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: false,
    plugins : 'autolink link image media lists preview emoticons',
    skin: 'lightgray',
    theme : 'modern'
  };
  
  $scope.publish = function () {
    $scope.obj = {
      "tn" : $scope.tn,
      "ts" : $scope.ts,
      "tt" : $scope.tt,
      "tc" : $scope.tc,
      "ta" : $scope.ta,
      "transport" : $scope.transport,
      "td" : $scope.tinymceModel,
      "media" : "images will go here"
    }
    $log.debug("Trip payload to send off to API:");
     $log.debug(SendTrip.tripSend($scope.obj));
  }
  
}]);