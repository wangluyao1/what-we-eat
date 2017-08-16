/**
 * Created by Luyao on 8/11/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("SearchController", SearchController);

    function SearchController($location,userService,resSearchService,restaurantService,user) {
        var model = this;
        model.user = user;

        model.searchRestaurants = searchRestaurants;
        model.searchRestaurantsByAddress = searchRestaurantsByAddress;
        model.searchUserByUsername = searchUserByUsername;
        model.goToUserDetail = goToUserDetail;
        model.searchLocalRes = searchLocalRes;
        model.goToLocalResDetail = goToLocalResDetail;
        model.logout = logout;

        function init() {
            if(user._id){
                model.logged = true;
                model.notLogged = false;
                model.isUser = (model.user.roles === 'USER');
                model.isManager = (model.user.roles === 'MANAGER');
                model.isAdmin = (model.user.roles === 'ADMIN');
            } else{
                model.notLogged = true;
                model.logged = false;
            }
        }

        init();

        function searchRestaurants(address,keyword) {
                if(!address){
                    model.alert = "Please Enter Your Address."
                }
                resSearchService.searchWithKeywordAndAddress(address,keyword)
                    .then(function (response) {
                        var result = response.data;
                        model.restaurants = result['restaurants'];
                        if(model.restaurants.length === 0){
                            model.alert = "No Results";
                        }
                        model.localRestaurants = null;
                        model.usersResult =null;
                    });
        }

        function searchRestaurantsByAddress(address) {
            resSearchService.searchWithAddress(address)
                .then(function (response) {
                    var result = response.data;
                    model.restaurants = result['restaurants'];
                    model.localRestaurants = null;
                    model.usersResult =null
                });
        }

        function searchLocalRes(keyword) {
            restaurantService
                .searchRestaurant(keyword)
                .then(function (response) {
                    model.localRestaurants = response.data;
                    if(model.localRestaurants.length === 0){
                        model.alert = "No Results";
                    }
                    model.restaurants = null;
                    model.usersResult =null;
                })
        }

        function searchUserByUsername(username) {
            return userService
                .findUserByUserName(username)
                .then(function (response) {
                    //todo : cannot find user
                    model.usersResult = response.data;
                    if(model.userResults === undefined){
                        model.alert = "No Results";
                    }
                    model.restaurants = null;
                    model.localRestaurants =null;
                });
        }

        function goToLocalResDetail(restaurantId) {
            $location.url("/restaurant/details/"+restaurantId);
        }

        function goToUserDetail(userResultId) {
            $location.url("/user/detail/"+ model.usersResult._id);
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