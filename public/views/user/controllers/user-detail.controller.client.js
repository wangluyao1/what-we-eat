/**
 * Created by Luyao on 8/12/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("UserDetailController", UserDetailController);

    function UserDetailController($routeParams,userService, $location,user,restaurantService) {
        var model = this;

        model.title = "User Detail";
        model.follow = follow;
        model.unfollow = unfollow;
        model.goToRestaurant =goToRestaurant;
        model.goToStarList=goToStarList;

        model.currentUser = user;
        model.viewedUserId = $routeParams["uid"];
        model.logout = logout;

        function init() {
            if(user._id){
                model.logged = true;
                model.isUser = (user.roles === 'USER');
                model.isManager = (user.roles === 'MANAGER');
                model.isAdmin = (user.roles === 'ADMIN');
            } else{
                model.logged = false;
            }
            return userService
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
                    findAllFollowers(model.viewedUserId);
                    model.alert= "Follow success";
                })
        }

        function unfollow(toUserId) {
            userService
                .unfollow(model.viewedUserId)
                .then(function (response) {
                    findAllFollowers(model.viewedUserId);
                    model.alert= "Unfollow success";
                })
        }

        function findAllFollowers(userId) {
            return userService
                .findFollowers(userId)
                .then(function (response) {
                    model.followersRelation = response.data;
                    var result = getFromRelation(model.followersRelation,"from");
                    model.followers = result;
                    refreshFollow();
                })
        }

        function refreshFollow() {
                    if(findUser(model.followersRelation) === undefined){
                        model.haveFollowed= false;
                        model.notFollowing = true;
                    } else {
                        model.haveFollowed = true;
                        model.notFollowing = false;
                    }
        }

        function findUser(relationArray) {
            return relationArray.find(fromUserRelation);
        }

        function fromUserRelation(relation){
            return relation.from === user._id;
        }

        // function commonElement(array1,array2) {
        //     for(var ele1 in array1){
        //         for(var ele2 in array2){
        //             if(array1[ele1] === array2[ele2]) return true;
        //         }
        //     }
        //     return false;
        // }

        function findAllFollowings(userId) {
            return userService
                .findFollowings(userId)
                .then(function (response) {
                    var followingsRelation = response.data;
                    model.followings = getFromRelation(followingsRelation,"toUser");
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

        function goToRestaurant(restaurantId) {
            return restaurantService
                .findRestaurantById(restaurantId)
                .then(function (response) {
                   var restaurant = response.data;
                    if(restaurant.type=== 'LOCAL'){
                        $location.url("/restaurant/details/"+restaurant._id);
                    } else {
                        $location.url("/eatstreet/restaurant/details/"+restaurant.key);
                    }
                });
        }

        function goToStarList() {
            $location.url("/user/detail/"+model.viewedUserId+"/starlist");
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
