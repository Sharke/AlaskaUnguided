auApp.controller('factController', ['$http', '$scope', '$animate', function ($http, $scope, $animate) {
    $http.get('/api/fact/random').then(function (response) {
        $animate.enabled(true);
        var str = response.data[0].fact;
        $scope.factLoaded = true;
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
    $scope.enterHandler = function (e) {
        alert();
        if (e.which === 13)
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


auApp.controller('activityController', ['$scope', '$http', '$log', '$animate', '$routeParams', '$rootScope', function ($scope, $http, $log, $animate, $routeParams, $rootScope) {

    $scope.params = $routeParams.tripId;

    //Get trip from database.
    $http.get('/app/data.json').then(function (res) {
        if (!angular.isUndefined(res.data)) {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i]._id === $routeParams.tripId) {
                    $log.info("Located trip " + res.data[i]._id);
                    $log.info(res.data[i]);
                    $scope.thisTrip = res.data[i];
                }
            }
        }
    });

    $scope.activeTab = 'overview';

    $scope.getImg = function () {
        return $scope.thisTrip.thumbnail;
    }

    $scope.getTab = function (tab) {
        $log.info("Active tab set is: " + $scope.activeTab);
        return $scope.activeTab == tab;
    }

    $scope.setTab = function (tab) {
        $log.info("Active tab set to: " + $scope.activeTab);
        $scope.activeTab = tab;

    }
    $scope.dropdown = function () {
        if ($scope.season === true) {
            $scope.season = false;

        } else {
            $scope.season = true;
        }
    }

    function initMap() {
        var uluru = {
            lat: -25.363,
            lng: 131.044
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    $scope.getCost = function () {

        switch ($scope.thisTrip.cost) {

            case "$0-$50":
                return "$";

            case "$51-$150":
                return "$$";

            case "$151-$250":
                return "$$$";

            case "$251+":
                return "$$$$+";
        }
        return "N/A";
    }

}]);