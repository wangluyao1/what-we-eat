/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminCollectionsController", AdminCollectionsController);

    function AdminCollectionsController() {
        var model = this;
        model.title = "Collections";

        function init() {

        }

        init();

        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();
