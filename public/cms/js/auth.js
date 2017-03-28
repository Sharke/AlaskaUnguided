angular.module('Auth', ["ngCookie"]).factory('Auth', function($cookieStore){
var user;

return{
    setUser : function(aUser){
        user = aUser;
        $cookieStore.put('cms.usr', user);
    },
    isLoggedIn : function(){
        return($cookieStore.get('cms.usr'))? user : false;
    }
  }
})