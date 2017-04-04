//Directives
cmsApp.directive('routeLoadingIndicator', function($rootScope){
  return {
    restrict:'E',
    template:"<div class='load__wrap l-anim' ng-if='isRouteLoading'><div class='loader'> </div></div>",
    link:function(scope, elem, attrs){
      scope.isRouteLoading = false;

      $rootScope.$on('$routeChangeStart', function(){
        scope.isRouteLoading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function(){
        scope.isRouteLoading = false;
      });
    }
  };
});

cmsApp.directive('matchHeight', function(){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
      //$('.cards').matchHeight();
    }
  };
});

cmsApp.directive('addSubActivity', function(){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
        $(elem).click(function () {
         swal({
  title: "Create sub activity",
  text: "Please select a trip type",
  type: "input",
  showCancelButton: true,
  confirmButtonColor: "darkorchid",
  confirmButtonText: "Next",
  cancelButtonText: "Cancel",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
   swal({
  title: "Sub activity details",
  text: "Enter details",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  
},
function(inputValue){
  if (inputValue === false) return false;
  
  if (inputValue === "") {
    swal.showInputError("Enter a trip name");
    return false
  }
  
        });
    }
  };
});


//Sign out directive
cmsApp.directive('signOut', ['Auth', '$location', function(Auth, $location){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
     $(elem).click(function(){
        scope.$apply(function() {
          scope.load = true;
            Auth.removeUser(); 
            $location.path('/login');
           // alert("test");
         return scope.load = false;
        })
     });
    }
  };
}]);
//New trip directive
cmsApp.directive('startNewTrip', function(){
  return {
    restrict:'A',
    link:function(scope, elem, attrs){
      $(elem).click(function() {
swal({
  title: "Create new trip",
  text: "Please select a trip type",
 
  showCancelButton: true,
  confirmButtonColor: "darkorchid",
  confirmButtonText: "Normal",
  cancelButtonText: "Sponsored",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
   swal({
  title: "New trip name",
  text: "Enter the new trip name",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  inputPlaceholder: "New trip..."
},
function(inputValue){
  if (inputValue === false) return false;
  
  if (inputValue === "") {
    swal.showInputError("Enter a trip name");
    return false
  }
  
  swal("Todo: take user to new trip details page");
});
  } else {
    
  }
});
      });
    }
  };
});