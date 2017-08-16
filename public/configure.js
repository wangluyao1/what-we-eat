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
                controllerAs: "model",
                resolve:{
                  user:checkCurrentUser
                }
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
            .when("/user/starlist/:uid",{
                templateUrl: "views/user/templates/user-starlist-edit.view.client.html",
                controller: "StarListEditController",
                controllerAs: "model"
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
            //********************admin*****************************************
            .when("/admin/collections",{
                templateUrl: "views/admin/templates/collections.view.client.html",
                controller: "AdminCollectionsController",
                controllerAs: "model"
            })
            .when("/admin/users",{
                templateUrl: "views/admin/templates/user-list.view.client.html",
                controller: "AdminUserController",
                controllerAs: "model"
            })
            .when("/admin/users/edit/:uid",{
                templateUrl: "views/admin/templates/user-edit.view.client.html",
                controller: "AdminUserEditController",
                controllerAs: "model"
            })
            .when("/admin/restaurants",{
                templateUrl: "views/admin/templates/restaurant-list.view.client.html",
                controller: "AdminRestaurantController",
                controllerAs: "model"
            })
            .when("/admin/reviews",{
                templateUrl: "views/admin/templates/review-list.view.client.html",
                controller: "AdminReviewController",
                controllerAs: "model"
            })
            .when("/admin/relations",{
                templateUrl: "views/admin/templates/relation-list.view.client.html",
                controller: "AdminRelationController",
                controllerAs: "model"
            })


            //*****************restaurant***************************************

            .when("/restaurant/create",{
                templateUrl: "views/restaurant/templates/manager/res-create.view.client.html",
                controller: "ResCreateController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            .when("/eatstreet/restaurant/details/:restaurantKey",{
                templateUrl: "views/restaurant/templates/client/res-detail.view.client.html",
                controller: "ResDetailController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            .when("/restaurant/details/:restaurantId",{
                templateUrl: "views/restaurant/templates/client/local-res-detail.view.client.html",
                controller: "LocalResDetailController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            .when("/restaurant/details/:restaurantKey/edit",{
                templateUrl: "views/restaurant/templates/manager/res-detail-edit.view.client.html",
                controller: "ResDetailEditController",
                controllerAs: "model"//,
                // resolve:{
                //     user:checkLogin,
                //     user:checkAdmin
                // }
            })

            //review
            .when("/restaurant/:restaurantId/review/:reviewId",{
                templateUrl: "views/review/templates/review-create.view.client.html",
                controller: "ReviewCreateController",
                controllerAs: "model",
                resolve:{
                    user:checkLogin
                }
            })
            .when("/restaurant/:restaurantId/review/:reviewId/edit",{
                templateUrl: "views/review/templates/review-edit.view.client.html",
                controller: "ReviewEditController",
                controllerAs: "model"//,
                // resolve:{
                //     user:checkLogin
                // }
            })


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

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            })
            .catch(function (error) {
            });
        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


})();