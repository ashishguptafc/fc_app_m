var module = angular.module('mojoTribe', ['ui.router', 'mojoForum', 'mojoLogin', 'mojoTrail', 'angularUtils.directives.dirPagination']);

module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/tribe_forum');

    $stateProvider
            /*
             * route provider for forum
             */
            .state('tribe_forum', {
                url: '/tribe_forum',
                templateUrl: 'Forum/forum-list-category.html',
                controller: 'forumCategoryController'
            }).
            state('forum-create-topic', {
                url: '/forum-create-topic/?subcategoryId&subcategoryName',
                templateUrl: 'Forum/forum-create-topic.html',
                controller: 'forumCreateTopicController'
            }).
            state('view_forum_topic', {
                url: '/view_forum_topic/?subcategoryId',
                templateUrl: 'Forum/forum-list-questions.html',
                controller: 'forumViewTopicController'
            }).
            state('forum_topic_comment', {
                url: '/forum_topic_comment/?questionId',
                templateUrl: 'Forum/forum-topic.html',
                controller: 'forumCommentTopicController'
            }).
            /*
             * route provider for forum ends here
             */
            /*
             * route provide for users and login
             */

            state('register', {
                url: '/register',
                templateUrl: 'Signup/register.html',
                controller: 'registerController'
            })
            .state('chasis_validation', {
                url: '/chasis',
                templateUrl: 'Signup/confirmation-owner.html',
                controller: 'LoginChasisController'
            })
            .state('congrats', {
                url: '/congrats',
                templateUrl: 'Signup/congrats.html',
                controller: 'loginCongratsController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'Signup/sign-in.html',
                controller: 'loginController'
            }).
            /*
             * route provider for users and login ends here
             */

            /*
             * route provide for Event
             */


            state('create-trail', {
                url: '/create-trail',
                templateUrl: 'Event/create-trail.html',
                controller: 'createTrailController'
            })
            .state('trail-route', {
                url: '/trail-route?id',
                templateUrl: 'Event/enter-trail-route-info.html',
                controller: 'enterTrailRouteInfoController'
            })
            .state('view-trail', {
                url: '/view-trail?id',
                templateUrl: 'Event/view-trail.html',
                controller: 'viewTrailController'
            })
            .state('tribe_trail', {
               url: '/tribe_trail',
               templateUrl: 'Event/event-landing.html',
               controller: 'eventLandingController'
            });

    /*
     * route provider for Events ends here
     */

//        // enable html5Mode for pushstate ('#'-less URLs)
//        $locationProvider.html5Mode(true);
//        $locationProvider.hashPrefix('!');
});

function OtherController($scope) {
    $scope.pageChangeHandler = function (num) {
        console.log('going to page ' + num);
    };
}


module.controller('OtherController', OtherController);






