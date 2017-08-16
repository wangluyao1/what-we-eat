/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("StarListEditController", StarListEditController);

    function StarListEditController($routeParams,userService,user,$location) {
        var model = this;

        model.userId = user._id;
        model.currentUser = user;
        model.logout = logout;

        function init() {
            if(user._id) {
                model.logged = true;
            }
            return userService
                .getStarList(model.userId)
                .then(function (response) {
                    model.restaurants = response.data;
                });
        }
        
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();