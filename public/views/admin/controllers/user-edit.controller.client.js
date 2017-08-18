/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminUserEditController", AdminUserEditController);

    function AdminUserEditController(userService,$routeParams,$location) {
        var model = this;
        model.title = "User Edit";
        model.userId = $routeParams.uid;

        model.saveUser = saveUser;
        model.logout = logout;

        function init() {
            return userService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                })
        }

        init();

        function saveUser(user) {
            return userService
                .updateUser(user._id,user)
                .then(function (response) {
                    if(response.status === 200)
                    $location.url("/admin/users");
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


    }
})();