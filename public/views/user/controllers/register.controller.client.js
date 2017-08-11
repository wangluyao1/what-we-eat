/**
 * Created by Luyao on 7/21/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, userService) {
        var model = this;

        model.register = register;

        function init() {

        }

        init();

        function register(user) {
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
                var promise2 = userService.createUser(user);
                promise2.then(function (response2) {
                    var responseUser2 = response2.data;
                    $location.url("user/" + responseUser2._id);
                });
            });


            //
            // if(userService.findUserByUserName(user.username) != null){
            //     model.alert = "User already exists."
            //     return;
            // }
            // if (user.password !== user.verifyPassword) {
            //     model.alert = "Password should be the same.";
            // } else {
            //     var date = new Date();
            //     user._id = (date.getTime()).toString();
            //     userService.createUser(user);
            //     $location.url("user/" + user._id);
            // }
        }
    }
})();