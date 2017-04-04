angular.module('Auth', ["ngCookies"]).factory('Auth', ['$cookieStore', '$location', function($cookieStore, $location){
    var user = $cookieStore.get('cms.usr');
return{
    setUser : function(aUser){
        user = aUser;
        $cookieStore.put('cms.usr', aUser);
    },
    isLoggedIn : function(){
        return($cookieStore.get('cms.usr')) ? user : false;
    },
    removeUser: function(){
        $cookieStore.remove('cms.usr');
    },
    getUser: function () {
        return $cookieStore.get('cms.usr');
    }
  }
}]);