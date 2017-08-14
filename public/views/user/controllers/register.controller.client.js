/**
 * Created by Luyao on 7/21/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, userService,currentUser) {
        var model = this;

        model.register = register;

        function init() {

        }

        init();

        function register(user,role) {
            var promise = userService.findUserByUserName(user.username);
            promise.then(function (response) {
                var responseUser = response.data;
                if (responseUser) {
                    model.alert = "User already exists.";
                    return;
                }
                if (user.password !== user.verifyPassword) {
                    model.alert = "Password should be the same.";
                    return;
                }

                user.roles = role;
                var promise2 = userService.createUser(user);
                promise2.then(function (response2) {
                    currentUser = response2.data;
                    $location.url("profile");
                });
            });
        }
    }
})();