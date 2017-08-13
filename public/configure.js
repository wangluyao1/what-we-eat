/**
 * Created by Luyao on 8/11/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            //view other users
            .when("/user/detail/:uid",{
                templateUrl: "views/user/templates/user-detail.view.client.html",
                controller: "UserDetailController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            // .when("/user/detail/:uid/res_list",{
            //     templateUrl: "views/user/templates/user-detail.view.client.html",
            //     controller: "",
            //     controllerAs: "model",
            // })
            // .when("/user/detail/:uid/res_list/:listId",{
            //     templateUrl: "views/user/templates/user-detail.view.client.html",
            //     controller: "",
            //     controllerAs: "model",
            // })

    }

    function checkLogin(userService,$q,$location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url("/login");
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();