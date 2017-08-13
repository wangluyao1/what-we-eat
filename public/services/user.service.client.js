/**
 * Created by Luyao on 7/20/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("userService", userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUserName": findUserByUserName,
            "findUserByCredentials": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin
        };

        return api;

        function checkLogin() {
            var url = "/api/checkLogin";
          return $http.get(url)
              .then(function (response) {
                  return response.data;
              });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUserName(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {

            var url = "/api/login";
            return $http.post(url,{username:username,password:password});
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+ userId;
            return $http.delete(url);
        }

    }

})();