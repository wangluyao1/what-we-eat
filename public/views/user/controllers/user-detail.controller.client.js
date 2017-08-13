/**
 * Created by Luyao on 8/12/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("UserDetailController", UserDetailController);

    function UserDetailController($routeParams,userService, $location,user) {
        var model = this;

        model.follow = follow;
        model.unfollow = unfollow;

        model.currentUser = user;
        model.viewedUserId = $routeParams["uid"];

        function init() {
            userService
                .findUserById(model.viewedUserId)
                .then(function (response) {
                    model.viewedUser = response.data;
                });
        }

        init();

        function follow(toUserId) {
            userService
                .follow(model.viewedUserId)
                .then(function (response) {
                    model.alert("Follow success");
                })
        }

        function unfollow(toUserId) {
            userService
                .unfollow(model.viewedUserId)
                .then(function (response) {
                    model.alert("Unfollow success");
                })
        }


    }
})();
