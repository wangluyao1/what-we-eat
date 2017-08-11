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
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();