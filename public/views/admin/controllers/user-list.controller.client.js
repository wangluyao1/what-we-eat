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

        model.deleteUser = deleteUser;
        model.addUser = addUser;

        function init() {
            refreshModelUsers();
        }

        function refreshModelUsers() {
            return userService
                .allUsers()
                .then(function (users) {
                    model.users = users.data;
                })
        }
        init();

        function addUser(newUser) {
            return userService
                .createUser(newUser)
                .then(function (response) {
                    refreshModelUsers();
                })
        }

        function deleteUser(userId) {
            return userService
                .deleteUser(userId)
                .then(function (response) {
                    refreshModelUsers();
                });
        }


    }


})();
