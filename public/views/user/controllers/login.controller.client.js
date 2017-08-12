/**
 * Created by Luyao on 7/20/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("LoginController", LoginController)

    function LoginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        }

        init();

        function login(user) {
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise.then(function (response) {
                if (!response.data) {
                    model.alert = "Unable to log in.";
                } else {
                    $location.url("profile");// + response.data._id);

                }
            })

            // user = userService.findUserByCredentials(user.username, user.password);
            // if (user === null) {
            //     model.alert = "Unable to log in.";
            // } else {
            //     $location.url("user/" + user._id);
            // }
        }
    }
})();