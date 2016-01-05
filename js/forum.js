var forumModule = angular.module('mojoForum', []);
var forumFactory = forumModule.factory('forumHttpPostServices', function ($http) {
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
var forumController = forumModule.controller('forumCategoryController', function ($scope, $http, forumHttpPostServices) {

    $scope.data = {};

    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/tribe_forum";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {

                if (response.status) {
                    $scope.result = response.data;
//             console.log($scope.data);
                } else {

                }
            });
});

/*
 * Forum comment controller
 */
var forumController = forumModule.controller('forumCommentTopicController', function ($scope, $http, forumHttpPostServices, $stateParams) {
    /*
     * code for forum controller object
     */
    $scope.forumViewCommentTopic = {}
    $scope.forumViewCommentTopic.topic_id = $stateParams.questionId;
    $scope.data = {};

    $scope.data = $scope.forumViewCommentTopic;

    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/topic_inside";

    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
                    console.log(response);
                    $scope.question = response.data.topic[0];
                    $scope.questionComment = response.data.topic_comment;
                    console.log($scope.questionComment);

                } else {
                }
            });

    $scope.submitTopicComment = function () {
        $scope.topicComment = {};
        $scope.topicComment.comment = $scope.topic.comment;
        $scope.topicComment.unique_id = "a67d0a56-a339-11e5-bb77-fcaa14699389";
        $scope.topicComment.forum_topic_id = $scope.question.id;
        console.log($scope.topicComment);
        $scope.data = {};

        $scope.data = $scope.topicComment;
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/forum_comment";
        forumHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    if (response.status) {
                        $scope.msg = response;
                        $scope.topic = {};


                    } else {
                    }
                }).error(function () {

        });
    }
});

/*
 * Forum view topic controller
 */
var forumController = forumModule.controller('forumViewTopicController', function ($scope, $http, forumHttpPostServices, $stateParams) {
    /*
     * code for forum controller object
     */
    $scope.forumViewTopic = {}
    $scope.forumViewTopic.forum_sub_cat_id = $stateParams.subcategoryId;
    $scope.data = {};

    $scope.data = $scope.forumViewTopic;
    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/view_forum_topic";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
                    console.log(response);
                    $scope.list_question = response.data;
                    $scope.total = Object.keys($scope.list_question.records).length;


                } else {

                }
            });
});

/*
 * Forum forum topic comment controller
 */
var forumController = forumModule.controller('forumCreateTopicController', function ($state, $location, $scope, $http, forumHttpPostServices, $stateParams) {
    /*
     * check user logged in or not 
     */
    $scope.redirect = {};
    $scope.redirect.link = $location.absUrl();
    $scope.data = {};
    $scope.data = $scope.redirect;
    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/users/check_loggedin";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
//                    $scope.user_data = response.data;
//                    console.log($scope.user_data);
                } else {
                    $state.go('login');
//                    $state.href($scope.redirect.link);
//                    
                }
            }).error(function (response) {
    });


    $scope.forumComment = {};
    $scope.forumComment.forum_sub_cat_id = $stateParams.subcategoryId;
    /*
     * unique id of logged in user
     */
    $scope.forumComment.unique_id = "a67d0a56-a339-11e5-bb77-fcaa14699389";
    $scope.data = {};
    $scope.data = $scope.forumComment;
    $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/forum_subcategory";
    forumHttpPostServices
            .fetchData($scope.url, $scope.data)
            .success(function (response) {
                if (response.status) {
                    $scope.items = response.data;
                    $scope.forumComment.selected = $scope.items[0];
                } else {

                }
            }).error(function (response) {
    });

    $scope.submitComment = function () {
        $scope.forumViewTopic = {}
//        $scope.forumViewTopic.forum_cat_id = "1";
        $scope.forumViewTopic.forum_sub_cat_id = $stateParams.subcategoryId;
        $scope.forumViewTopic.unique_id = $scope.forumComment.unique_id;
        $scope.forumViewTopic.title = $scope.forumComment.title;
        $scope.forumViewTopic.content = $scope.forumComment.comment;

        $scope.data = {};

        $scope.data = $scope.forumViewTopic;
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/forum/forum_topic";
        forumHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    if (response.status) {
                        $scope.msg = response;
                        delete $scope.forumComment.title;
                        delete  $scope.forumComment.comment;

                    } else {
                        $scope.msg = response;
                    }
                }).error(function () {
            $scope.msg = {"status": 0, "message": "Unknown database error Please try again "};
        });
    };
});