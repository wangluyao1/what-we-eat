/**
 * Created by Luyao on 7/21/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ProfileController", ProfileController)

    function ProfileController(userService, $location, user) {
        var model = this;
        //model.userId = $routeParams["uid"];
        model.userId = user._id;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            //model.user = userService.findUserById(model.userId);
            var promise = userService.findUserById(model.userId);
            promise.then(function (response) {
                model.user = response.data;
            })

        }

        init();

        function updateUser(user) {
            var promise = userService.updateUser(model.userId, user);
            promise.then(function (response) {
            });
        }

        function unregister() {
            userService.deleteUser(model.userId)
                .then(function (response) {
                    console.log(response.status);
                    if (response.status === 200) {
                        $location.url("/login");
                    }
                });

        }
    }
})();