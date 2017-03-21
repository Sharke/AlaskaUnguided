
//Controllers
auApp.controller('homeController', ['$scope', '$http','$log', '$animate', 'newsletter', '$timeout', function($scope, $http, $log, $animate, newsletter, $timeout) {
    //Call helpers
    $scope.helpers = ALASKA_UNGUIDED_NS.h;
    $scope.featuredFirstCard = {};
  //Newsletter
  $scope.hasSubmitted = false;
    $scope.submitEmail = function() {
       if(newsletter.submitNewsletter($scope.auemail)) {
            $scope.showSuccessSubmit = true;
              $scope.hasSubmitted = true;
           $timeout(function() {
                $scope.showSuccessSubmit = false;
           
           }, 1500);
          
       }  
    } 

        $scope.getCards = function () {
        if (!$scope.called) {
            $http.get('/api/trip/search?random=true&count=5').then(function (response) { 
                //set data, but not the first index
                $scope.cardObjects = response.data.slice(1);
                $scope.allCards = response.data;
               for(var i = 0; i <= response.data.length; i++){
                   if(i == 0) {
                       $scope.featuredFirstCard = response.data[i]
                   }
               }
               
            });
        } else {
           
        }
    }
    $scope.getCards();

    $scope.dayPlural = function (num) {
        if(num == 1) {
            return "day";
        }
        return "days";
    }
}]);
auApp.controller('factController', ['$http', '$scope', '$animate', function ($http, $scope, $animate) {
    $http.get('/api/fact/random').then(function (response) {
        $animate.enabled(true);
         $scope.factLoaded = true;
        var str = response.data[0].fact;
       
        $scope.randomFact = str;

    });
}]);
auApp.controller('searchController', ['$scope', '$log', '$http', '$timeout', '$document', '$rootScope', function ($scope, $log, $http, $timeout, $document, $rootScope) {
   
    //Set the initial limit value of results 
    $scope.lim = 10;
    $scope.called = false;
    //Set base api url
    $scope.loadMoreTrips = function () {
        //add logic to hide button
        return $scope.lim += 5;
    }

    
         $scope.apiBaseUrl = "/api/trip/search";
    
   

    //On enter button press
    $scope.enterHandler = function ($event) {
        alert();
        if ($event.which === 13)
            $scope.tripSearch();
    }
    $scope.getCards = function () {
        if (!$scope.called) {
            $http.get($scope.apiBaseUrl).then(function (response) {
                $scope.called = true;
                $scope.cardObjects = response.data;
                //Set the trip object to the root scope for global access
                $rootScope.tripObject = response.data;
                $log.info("initcall");
            });
        } else {
            $log.info($scope.called);
        }
    }
    $scope.getCards();


    //Begin search form methods
    $scope.inputCollection = {
        searchParam: ["keyword="],
        tripTypeParam: ["type="],
        tripCostParam: ["cost="],
        startDate: ["start="],
        endDate: ["end="]
    }

    $scope.tripSearch = function () {

        $scope.definedVals = [];
        //Check object size for looping intentions and set it to our scope
        $scope.objSize = Object.keys($scope.inputCollection).length;
        for (var i = 0; i < $scope.objSize; i++) {
            var name = $scope.getCollectionArrayFromObj($scope.inputCollection)[i];
            if ($scope.inputCollection[name].param !== undefined && $scope.inputCollection[name].param !== null) {
                if (name === "searchParam" && $scope.inputCollection[name].param === "") {
                    $log.warn("No data was entered into the search box, yet it was active. Nothing to see here.");
                } else {
                    $scope.definedVals.push(name);
                }
            } else {
                $log.debug("Undefined: " + name);
            }
        }
        return $scope.buildApiUrl();
    }
    $scope.getCollectionArrayFromObj = function (obj) {
        return Object.keys(obj);
    }
    $scope.buildApiUrl = function () {
        if ($scope.definedVals.length === 0 || angular.isUndefined($scope.definedVals)) {
            $log.info("default search because of blank inputs..returning all trips");
            $http.get($scope.apiBaseUrl).then(function (response) {
                $scope.em($scope.cardObjects);
                $scope.cardObjects = response.data;
                //Set the trip object to the root scope for global access
                $rootScope.tripObject = response.data;
                $log.info("on click call with no params");
                return $scope.cardObjects;
            });
        } else {
            for (var i = 0; i < $scope.definedVals.length; i++) {
                if ($scope.inputCollection[$scope.definedVals[i]][0] == null) {
                    $log.info("null detected");
                }
                if (i === 0) {
                    // $log.info("i = 1?  : " + i);
                    $scope.apiUrl = "?" + $scope.inputCollection[$scope.definedVals[i]][0] + $scope.inputCollection[$scope.definedVals[i]].param;
                } else {
                    //  $log.info("i = " + i);
                    var s = "&" + $scope.inputCollection[$scope.definedVals[i]][0] + $scope.inputCollection[$scope.definedVals[i]].param;
                    $scope.apiUrl = $scope.apiUrl.concat(s);

                }
            }
            $scope.builtUrl = true;
            //$log.info($scope.apiBaseUrl + $scope.apiUrl);
            $http.get($scope.apiBaseUrl + $scope.apiUrl).then(function (response) {
                $scope.em($scope.cardObjects);
                if (response.data !== $scope.cardObjects) {
                    $scope.cardObjects = response.data;
                    //Set the trip object to the root scope for global access
                    $rootScope.tripObject = response.data;
                    $log.info("on click cal lwith params");
                }
            });
            return $scope.cardObjects;
        }
    }
    $scope.em = function emptyObject(obj) {
        if (obj !== undefined) {
            $log.info('done');
            Object.keys(obj).forEach(k => delete obj[k]);
        }
    }
    $scope.getSearchUrl = function () {
        alert();
        if ($scope.builtUrl) {
            $log.info("builtUrl = true");
            return $scope.apiBaseUrl + $scope.apiUrl;
        } else {
            $log.info("doing tripSearch()");
            return $scope.tripSearch();
        }
    }

}]);
auApp.controller('activityController', ['$scope', '$http', '$log', '$animate', '$routeParams', '$rootScope', 'newsletter', '$sce', function ($scope, $http, $log, $animate, $routeParams, $rootScope, newsletter, $sce) {


    
    $scope.hasSubmitted = false;
    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

    $scope.api = "/api/trip/search/" + $routeParams.tripId;
    //set namespace object to scope variable to give us access to the namespace
    $scope.helpers = ALASKA_UNGUIDED_NS.h;
        $scope.getActivities = function() {
         $scope.partners = [];
        for(var i = 0; i < $scope.thisTrip.activities.length; i++){
            $scope.partnerUrl = "/api/ad/" +  $scope.thisTrip.activities[i].name;
            $http.get($scope.partnerUrl).then(function (res){          
                if(res.data.length > 0) {
                   
                    $scope.partners.push(res.data);   
                                
                }else{
                   //API has no data in it. 
                   //Whut
                }
                
                
            });
        }
        $log.info($scope.partners); 
    }
   
   $scope.loadM = function (src) {
  var uluru = {
    lat: -25.363,
    lng: 131.044
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  $scope.loadKml(src, map);
}
/**
 * Adds a KMLLayer based on the URL passed. Clicking on a marker
 * results in the balloon content being loaded into the right-hand div.
 * @param {string} src A URL for a KML file.
 */
$scope.loadKml = function (src, map) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map

  });
  google.maps.event.addListener(kmlLayer, 'click', function (event) {
    var content = event.featureData.infoWindowHtml;
    var testimonial = document.getElementById('capture');
    testimonial.innerHTML = content;
  });
 
}
    //Get trip from the root scope if the object exists. if not, grab from api.
        if (!angular.isUndefined($rootScope.tripObject)) {
            $log.warn("Rootscope set - calling from rootScope");
            for (var i = 0; i < $rootScope.tripObject.length; i++) {
                if ($rootScope.tripObject[i]._id === $routeParams.tripId) {
                    $log.info("Located trip " + $rootScope.tripObject[i]._id);
                    $log.info($rootScope.tripObject[i]);
                    $scope.thisTrip = $rootScope.tripObject[i];
                    //
                     $scope.getActivities();
                     $scope.mlink = $scope.thisTrip.destination[0].map;
                    $scope.loadM($scope.mlink);
                     
                }
            }
          
        }else{
            $log.warn("Rootscope wasn't set - calling API to get data: " +$scope.api);
            $http.get($scope.api).then(function (res) {
                 if (res.data._id === $routeParams.tripId) {
                    $log.info("Located trip " + res.data._id);
                    $scope.thisTrip = res.data;
                   $scope.getActivities();
                  $scope.mlink = $scope.thisTrip.destination[0].map;
                    $scope.loadM($scope.mlink);
                  
                    // $log.info($scope.thisTrip.destination.map);
                }
            });
    
        }
        
      

    //newsletter
    $scope.submitEmail = function() {
       if(newsletter.submitNewsletter($scope.auemail)) {
           $scope.hasSubmitted = true;
       }  
    } 
   

    
    $scope.activeTab = 'overview';

    $scope.getImg = function () {
        return $scope.thisTrip.thumbnail;
    }

    $scope.getTab = function (tab) {
       // $log.info("Active tab set is: " + $scope.activeTab);
        return $scope.activeTab == tab;
    }

    $scope.setTab = function (tab) {
       // $log.info("Active tab set to: " + $scope.activeTab);
        $scope.activeTab = tab;

    }
    $scope.dropdown = function () {
        if ($scope.season === true) {
            $scope.season = false;
        } else {
            $scope.season = true;
        }
    }


    
}]);