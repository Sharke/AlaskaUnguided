
auApp.controller('factController', ['$http', '$scope', '$animate', function ($http, $scope, $animate) {
      $http.get('/api/fact/random').then(function(response) {
          $animate.enabled(true);
        var str = response.data[0].fact;
        $scope.factLoaded = true;
        $scope.randomFact = str;
     
      });
    }]);

auApp.controller('searchController', ['$scope', '$log', '$http', '$timeout', '$document', function ($scope, $log, $http, $timeout, $document) {
//Set the initial limit value of results 
$scope.lim = 3;
//Set base api url
$scope.loadMoreTrips = function () {
  //add logic to hide button
  return $scope.lim += 3;
}
    $scope.apiBaseUrl = "/api/cards";
    $http.get('/app/data.json').then(function (response) {
   $scope.cardObjects = response.data;  
  });
   $scope.getCards = function() {
     return $scope.cardObjects;
   }

    //Begin search form methods
    $scope.inputCollection = {
        searchParam: ["kw="],
        tripTypeParam: ["t="],
        tripCostParam: ["c="],
        startDate: ["sd="],
        endDate: ["ed="]
    }

    $scope.tripSearch = function () {
        $scope.definedVals = [];
        //Check object size for looping intentions and set it to our scope
        $scope.objSize = Object.keys($scope.inputCollection).length;
        for (var i = 0; i < $scope.objSize; i++) {
            var name = $scope.getCollectionArrayFromObj($scope.inputCollection)[i];
            if ($scope.inputCollection[name].param !== undefined) {
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
        if ($scope.definedVals.length === 0 ||  angular.isUndefined($scope.definedVals)) {
            alert('Nothing entered in boxes - cannot build params for custom api call.');
            return false;
        }
        for (var i = 0; i < $scope.definedVals.length; i++) {
            if (i === 0) {
                $log.info("i = 1?  : " + i);
                $scope.apiUrl = "?" + $scope.inputCollection[$scope.definedVals[i]][0] + $scope.inputCollection[$scope.definedVals[i]].param;
            } else {
                $log.info("i = " + i);
                var s = "&" + $scope.inputCollection[$scope.definedVals[i]][0] + $scope.inputCollection[$scope.definedVals[i]].param;
                $scope.apiUrl = $scope.apiUrl.concat(s);
            }
        }
        $scope.builtUrl = true;
        return $scope.apiBaseUrl + $scope.apiUrl;
    }
    $scope.getSearchUrl = function () {
        if ($scope.builtUrl) {
            return $scope.apiBaseUrl + $scope.apiUrl;
        }
    }
}]);