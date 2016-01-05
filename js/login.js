var loginmodule = angular.module('mojoLogin', []);
var loginFactory = loginmodule.factory('loginHttpPostServices', function ($http) {
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
    }
});
var loginController = loginmodule.controller('LoginChasisController', function ($state, $scope, $http, loginHttpPostServices) {
    /*
     * code for chasis controller
     */
    $scope.chasisSubmit = function () {
        $scope.loginChasis = {};
        $scope.loginChasis.chasis_id = $scope.chasis.chasis_id;

        $scope.data = {};
        $scope.data = $scope.loginChasis;
        console.log($scope.data);
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/users/chasis";
        loginHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    if (response.status) {
                        $state.go('congrats');
                    } else {
                        if (response.login) {
                            $state.go('login');
                        } else {
                            $scope.error_msg = response;
                        }

                    }

                });
    };
});

var register = loginmodule.controller("registerController", function ($scope, $http, loginHttpPostServices, $state) {
    $scope.registerSubmit = function () {
        console.log($scope.register);

        /*
         * code for register form data save
         */
        $scope.register.from = "signupform";
        $scope.data = {};
        $scope.data = $scope.register;
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/users/register";
        loginHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                    if (response.status) {
                        $state.go('chasis_validation');
                    } else {
                        $scope.error = response.error;

                    }
                });
    };
});
var loginController = loginmodule.controller('loginCongratsController', function ($scope, $http, loginHttpPostServices) {
    /*
     * code for chasis controller
     */

});

/*
 * controller for login
 */
var loginController = loginmodule.controller('loginController', function ($window, $state, $scope, $http, loginHttpPostServices) {
    /*
     * code for login controller
     */
    $scope.loginSubmit = function () {
        $scope.loginFormData = {};
        $scope.loginFormData = $scope.loginFormInput;

        $scope.data = {};
        $scope.data = $scope.loginFormData;
        $scope.url = "http://localhost/ashish/mojo/api/index.php/api/users/login";
        loginHttpPostServices
                .fetchData($scope.url, $scope.data)
                .success(function (response) {
                   
                    if (response.status) {
                        $window.location.href = response.redirect_link;
                    } else {
                        $scope.msg = response.message;
                        $scope.error = response.error;

                    }
                });
    }

});

