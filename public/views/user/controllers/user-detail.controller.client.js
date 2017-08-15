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
                    findAllFollowers(model.viewedUserId);
                    findAllFollowings(model.viewedUserId);
                });
        }

        init();

        function follow(toUserId) {
            userService
                .follow(model.viewedUserId)
                .then(function (response) {
                    findAllFollowings(model.viewedUserId);
                    model.alert= "Follow success";
                })
        }

        function unfollow(toUserId) {
            userService
                .unfollow(model.viewedUserId)
                .then(function (response) {
                    findAllFollowings(model.viewedUserId);
                    model.alert= "Unfollow success";
                })
        }

        function findAllFollowers(userId) {
            return userService
                .findFollowers(userId)
                .then(function (response) {
                    var followersRelation = response.data;
                    // var followers =[];
                    // followersRelation
                    //     .forEach(function (relation) {
                    //         var from = relation.from;
                    //         userService
                    //             .findUserById(from)
                    //             .then(function (user) {
                    //                 followers.push(user.data);
                    //             });
                    //         model.followers = followers;
                    //     })
                    model.followers = getFromRelation(followersRelation,"from");
                    return;
                })
        }

        function findAllFollowings(userId) {
            return userService
                .findFollowings(userId)
                .then(function (response) {
                    var followingsRelation = response.data;
                    // var followers =[];
                    // followersRelation
                    //     .forEach(function (relation) {
                    //         var from = relation.from;
                    //         userService
                    //             .findUserById(from)
                    //             .then(function (user) {
                    //                 followers.push(user.data);
                    //             });
                    //         model.followers = followers;
                    //     })
                    model.followings = getFromRelation(followingsRelation,"toUser");
                    return;
                })
        }

        //helper,so not declared top in model
        function  getFromRelation(relationArray,elementName){
            var elements =[];
            relationArray
                .forEach(function (relation) {
                    var elementUser = relation[elementName];
                    userService
                        .findUserById(elementUser)
                        .then(function (user) {
                            elements.push(user.data);
                        });
                });
            return elements;
        }


    }
})();
