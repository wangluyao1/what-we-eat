/**
 * Created by Luyao on 7/20/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("LoginController", LoginController)

    function LoginController($location, userService,user) {
        var model = this;

        model.title = "Login";
        model.login = login;

        function init() {
            if(user._id){
                $location.url("/profile");
            }
        }

        init();

        function login(user) {
            if(!user.username || !user.password){
                model.alert = "Please enter username and password";
            }
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise.then(function (response) {
                if (!response.data) {
                    model.alert = "Username or password not correct.";
                } else {
                    $location.url("/");// + response.data._id);
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