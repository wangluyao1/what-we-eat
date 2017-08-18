/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController(userService,$location) {
        var model = this;
        model.title = "Manage Users";

        model.deleteUser = deleteUser;
        model.addUser = addUser;
        model.goToEdit = goToEdit;
        model.logout = logout;

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

        function goToEdit(user) {
            $location.url("/admin/users/edit/"+user._id);
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
