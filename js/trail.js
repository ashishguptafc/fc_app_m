var trailModule = angular.module('mojoTrail', ['ngAnimate', 'ui.bootstrap', 'ngMap', 'angular-owl-carousel']);

var trailFactory = trailModule.factory('forumHttpPostServices', function ($http) {
    return {
        fetchData: function (url, data) {
            var request = $http({
                method: "post",
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            });
            return request;
        }
    };
});
var trailController = trailModule.controller('createTrailController', function ($rootScope, $filter, $state, $scope, $http, forumHttpPostServices) {
    $scope.trailEvent = {};
    $scope.today = function () {
        $scope.dt = new Date();
//    $scope.trailEvent.start_date = $scope.dt;
    };
    $scope.today();




    $scope.openstart = function ($event) {
        $scope.trailEvent.start_date = $scope.dt;
        $scope.status.openedstartdate = true;
    };
    $scope.openend = function ($event) {
        $scope.trailEvent.end_date = $scope.dt;
        $scope.status.openedenddate = true;
    };


    $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };


    /*TIME*/

    $scope.trailEvent.start_time1 = new Date();
//    $scope.trailEvent.start_time = $scope.trailEvent.start_time1;
    $scope.$watch('trailEvent.start_time1',function (newValue) {
        $scope.trailEvent.start_time = $filter('date')(newValue, 'h:mm a');
    });


    $scope.openTime = false;
    $scope.showTime = function () {
        $scope.openTime = !$scope.openTime;

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };
    };


    /*End Time*/


    $scope.submitTrail = function () {
        $scope.trailEvent.unique_id = "123-ash";

        $scope.trailCreateEvent = {};
        //$scope.trailEvent = {};

        $scope.trailCreateEvent.unique_id = $scope.trailEvent.unique_id;
        $scope.trailCreateEvent.event_title = $scope.trailEvent.event_title;
        $scope.trailCreateEvent.event_content = $scope.trailEvent.event_content;
        $scope.trailCreateEvent.start_date = $scope.trailEvent.start_date.getTime();
        $scope.trailCreateEvent.end_date = $scope.trailEvent.end_date.getTime();
        $scope.trailCreateEvent.event_time = $scope.trailEvent.start_time;
        $scope.trailCreateEvent.road_type = $scope.trailEvent.road_type;


        $scope.data = {};

        $scope.data = $scope.trailCreateEvent;
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/tribe_events/create_trail";
        forumHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    //console.log(response);
                    if (response.status) {
                        $scope.msg = response;
                        delete $scope.trailEvent.event_title;
                        delete $scope.trailEvent.event_content;
                        delete $scope.trailEvent.start_date;
                        delete $scope.trailEvent.end_date;
                        delete $scope.trailEvent.event_time;
                        delete $scope.trailEvent.road_type;
                        $state.go('trail-route', {id: response.id});
                    } else {
                        $scope.msg = response;
                    }
                }).error(function () {
            $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
        });
    };

});

var trailController = trailModule.controller('enterTrailRouteInfoController', function ($state, $scope, $http, forumHttpPostServices, $rootScope, $stateParams) {

//    $rootScope.logLatLng = function(e) {
//          console.log('loc', e.latLng);
//        };
//console.log($stateParams);
    $scope.via = {};
    //$scope.trailRoute= {};
    if ($scope.via) {
        $rootScope.wayPoints = [];
        $rootScope.wayPoints.push($scope.via);
    }
    ;

    $scope.submitTrailRoute = function () {
//      if ($scope.via) {
//        $rootScope.wayPoints = [];
//     $rootScope.wayPoints.push($scope.via);  
//      };
        $scope.trailCreateRoute = {};

        $scope.trailCreateRoute.tribe_event_id = $stateParams.id;
        $scope.trailCreateRoute.origin = $scope.origin;
        $scope.trailCreateRoute.going_via = $scope.via.location;
        $scope.trailCreateRoute.destination = $scope.destination;


        $scope.data = {};
        $scope.data = $scope.trailCreateRoute;

        //console.log($scope.data);
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/tribe_events/create_location_trail";
        forumHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    console.log(response);
                    if (response.status) {
//                        $scope.msg = response;
                        delete $scope.trailCreateRoute.tribe_event_id;
                        delete $scope.trailCreateRoute.origin;
                        delete $scope.trailCreateRoute.destination;
                        delete $scope.trailCreateRoute.going_via;
                        $state.go('view-trail', {id: response.event_id});
                    } else {
                        $scope.msg = response;
                    }
                }).error(function () {
            $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
        });

    };

});

var trailController = trailModule.controller('viewTrailController', function ($scope, $http, forumHttpPostServices, $rootScope, $stateParams) {

    $scope.data = {};
    $scope.data.event_id = $stateParams.id;
    console.log($stateParams);
    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/tribe_events/trail_view";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
                    //console.log(response);
                    $scope.event_data = response.data[0];
                } else {
                    $scope.msg = response;
                }
            }).error(function () {
        $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
    });

    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/tribe_events/event_join";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
                    console.log(response);
                    $scope.event_join_data = response.data;
                    $scope.join_total = Object.keys($scope.event_join_data).length;
                    //console.log($scope.join_total);
                } else {
                    $scope.msg = response;
                }
            }).error(function () {
        $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
    });
});


var trailController = trailModule.controller('eventLandingController', function ($scope, $http, forumHttpPostServices, $rootScope, $stateParams) {
    
//    $('.owl-carousel').owlCarousel({
//        loop: true,
//        margin: 10,
//        responsiveClass: true,
//        //navigation:true,
//        nav: true,
//        //navText: ["<img src='myprevimage.png'>","<img src='mynextimage.png'>"]
//        navText: [
//            "<img src='images/pre.jpg'>", "<img src='images/next.jpg'>"],
//        responsive: {
//            0: {
//                items: 1,
//                // nav: true
//            },
//            600: {
//                items: 2,
//                ///nav: false
//            },
//            1000: {
//                items: 4,
//                // nav: true,
//                loop: false,
//                margin: 20
//            }
//        }
//    });
    $scope.items = [];
    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/tribe_events/trail_list";
    forumHttpPostServices
            .fetchData($scope.url)
            .success(function (response) {
                if (response.status) {
                    $scope.items = response.data;
                } else {
                    $scope.msg = response;
                }
            }).error(function () {
        $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
    });

});