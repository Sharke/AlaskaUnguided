angular.module('Auth', ["ngCookies"]).factory('Auth', function($cookieStore){
var user;
    var hasLogged = $cookieStore.get('cms.usr');
return{
    setUser : function(aUser){
        user = aUser;
        $cookieStore.put('cms.usr', user);
    },
    isLoggedIn : function(){
        return hasLogged
    }
  }
})