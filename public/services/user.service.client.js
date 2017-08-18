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
            "allUsers":allUsers,

            //user action
            "logout":logout,
            "checkLogin": checkLogin,
            "checkLogout" : checkLogout,
            "register":register,
            "checkAdmin":checkAdmin,
            "checkGeneralUser":checkGeneralUser,
            "checkManager":checkManager,

            //follow
            "follow":follow,
            "unfollow":unfollow,
            "findFollowers":findFollowers,
            "findFollowings":findFollowings,

            //star list
            "starRes":starRes,
            "unstarRes":unstarRes,
            "getStarList":getStarList,

            //reviews
            "getUserReviews":getUserReviews
        };

        return api;

        function checkLogin() {
            var url = "/api/checkLogin";
          return $http.get(url)
              .then(function (response) {
                  return response.data;
              });
        }

        function checkLogout(){
            var url = "/api/checkLogout";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkGeneralUser() {
            var url = "/api/checkGeneralUser";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkManager() {
            var url = "/api/checkManager";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }


        function logout() {
            var url = "/api/checkLogout";
            return $http.get(url);
        }

        function allUsers() {
            var url = "/api/allUsers";
            return $http.get(url);
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

        function follow(to){
            var url = "/api/user/follow/"+ to;
            return $http.get(url);
        }

        function unfollow(to) {
            var url = "/api/user/unfollow/"+to;
            return $http.get(url);
        }

        function findFollowers(userId) {
            var url = "/api/user/"+userId+"/followers";
            return $http.get(url);
        }

        function findFollowings(userId) {
            var url = "/api/user/"+userId+"/followings";
            return $http.get(url);
        }

        function starRes(userId,resId) {
            var url = "/api/user/"+userId+"/starRestaurant/"+resId;
            return $http.get(url);
        }

        function unstarRes(userId,resId) {
            var url = "/api/user/"+userId+"/unstarRestaurant/"+resId;
            return $http.get(url);
        }

        function getStarList(userId) {
            var url = "/api/user/"+userId+"/starList";
            return $http.get(url);
        }

        function getUserReviews(userId) {
            var url = "/api/user/"+userId+"/reviews";
            return $http.get(url);
        }
    }

})();