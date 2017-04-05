//Directives
cmsApp.directive('routeLoadingIndicator', function ($rootScope) {
    return {
        restrict: 'E',
        template: "<div class='load__wrap l-anim' ng-if='isRouteLoading'><div class='loader'> </div></div>",
        link: function (scope, elem, attrs) {
            scope.isRouteLoading = false;

            $rootScope.$on('$routeChangeStart', function () {
                scope.isRouteLoading = true;
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isRouteLoading = false;
            });
        }
    };
});

cmsApp.directive('matchHeight', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            //$('.cards').matchHeight();
        }
    };
});

//Sub activity add directive
cmsApp.directive('addSubActivity', ['$log', '$location', function ($log, $location) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).click(function () {
                var obj = {
                    n: '',
                    d: '',
                    sd: '',
                    ed: ''
                }
                var done = false;
                swal({
                        title: "Create new sub activity",

                        type: "input",
                        showCancelButton: true,
                        confirmButtonColor: "darkorchid",
                        confirmButtonText: "Continue",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function (inputValue) {
                        if (inputValue == false || inputValue == "") return false;

                        obj.n = inputValue;

                        swal({
                                title: "Sub actvity description",

                                text: "<textarea class='subdesc'></textarea>",
                                html: true,
                                showCancelButton: true,
                                confirmButtonColor: "darkorchid",
                                confirmButtonText: "Continue",
                                cancelButtonText: "Cancel",
                                closeOnConfirm: false,
                                closeOnCancel: true
                            },
                            function (isConfirm) {

                                obj.d = $('.subdesc').val();

                                swal({
                                        title: "Sub actvity start date (MM/DD/YYYY)",

                                        type: "input",
                                        showCancelButton: true,
                                        confirmButtonColor: "darkorchid",
                                        confirmButtonText: "Continue",
                                        cancelButtonText: "Cancel",
                                        closeOnConfirm: false,
                                        closeOnCancel: true
                                    },
                                    function (inputValue) {
                                        if (inputValue == false || inputValue == "") return false;

                                        obj.sd = inputValue;

                                        swal({
                                            title: "Sub actvity end date (MM/DD/YYYY)",
                                            type: "input",
                                            showCancelButton: true,
                                            confirmButtonColor: "darkorchid",
                                            confirmButtonText: "Continue",
                                            cancelButtonText: "Cancel",
                                            closeOnConfirm: false,
                                                closeOnCancel: true
                                            },
                                            function (inputValue) {
                                                if (inputValue == false || inputValue == "") return false;
                                                obj.ed = inputValue;
                                                 $log.debug('------PAYLOAD------');
                                                 $log.info(obj);
                                                 //Send object to a service that will POST data to API
                                                //service will return swal vv
                                               // swal("Good job!", "You clicked the button!", "success")
                                            }
                                        );

                                    }
                                );

                            }
                        );
                    }


                );
               
               
            });
            
        }
    };
}]);
//Sub activity add directive
cmsApp.directive('addTripType', ['$log', '$location', function ($log, $location) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).click(function () {
                var obj = {
                    n: '',
                    d: '',
          
                }
                
                swal({
                       title: "Create new trip type",
                        type: "input",
                        showCancelButton: true,
                        confirmButtonColor: "darkorchid",
                        confirmButtonText: "Continue",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: false,
                        closeOnCancel: true
                },
                    function (inputValue) {
                        if (inputValue == false || inputValue == "") return false;
                        obj.n = inputValue;
                        swal({
                        title: "New trip type description",
                        type: "input",
                        showCancelButton: true,
                        confirmButtonColor: "darkorchid",
                        confirmButtonText: "Continue",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true,
                        closeOnCancel: true  
                        },
                            function (inputValue) {
                            if (inputValue == false || inputValue == "") return false;
                            obj.d = inputValue;
                            $log.debug('------PAYLOAD TRIP TYPE------');
                if (obj.n == "" || obj.d == "") {
                    alert(obj.n);
                    $log.warn('one or more values are empty.'); 
                     $log.info(obj);
                } else {
                     $log.info(obj);
                   
               }        
                        }
                        )
                }
                )

            
               
                //Send object to a service that will POST data to API
            });
            
        }
    };
}]);
//Sign out directive
cmsApp.directive('signOut', ['Auth', '$location', function (Auth, $location) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).click(function () {
                scope.$apply(function () {
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
cmsApp.directive('startNewTrip', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $(elem).click(function () {
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
                    function (isConfirm) {
                        if (isConfirm) {
                            swal({
                                    title: "New trip name",
                                    text: "Enter the new trip name",
                                    type: "input",
                                    showCancelButton: true,
                                    closeOnConfirm: false,
                                    inputPlaceholder: "New trip..."
                                },
                                function (inputValue) {
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