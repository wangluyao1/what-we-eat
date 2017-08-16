/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController(userService) {
        var model = this;
        model.title = "Manager Users";

        function init() {
            return userService.allUsers
                .then(function (users) {
                    model.users = users.data;
                })

        }
        init()


    }


})();
