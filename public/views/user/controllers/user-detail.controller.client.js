/**
 * Created by Luyao on 8/12/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("UserDetailController", UserDetailController);

    function UserDetailController(userService, $location,user) {
        var model = this;

        model.currentUser = user;
        model.viewedUserId = $routeParams["uid"];

        function init() {
            userService
                .findUserById(viewedUserId)
                .then(function (response) {
                    model.viewedUser = response.data;
                });
        }

        init();

        function follow(followedUserId) {
            relationService
                .createRelation(model.currentUser._id,followedUserId)
                .then(function (response) {

                })
        }


    }
})();
