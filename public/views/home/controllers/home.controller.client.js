/**
 * Created by Luyao on 8/11/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("SearchController", SearchController);

    function SearchController($location,userService,resSearchService,restaurantService) {
        var model = this;

        model.searchRestaurantsByAddress = searchRestaurantsByAddress;
        model.searchUserByUsername = searchUserByUsername;
        model.goToUserDetail = goToUserDetail;
        model.searchLocalRes = searchLocalRes;
        model.goToLocalResDetail = goToLocalResDetail;

        function init() {

        }

        init();

        function searchRestaurantsByAddress(address) {
            resSearchService.searchWithAddress(address)
                .then(function (response) {
                    var result = response.data;
                    model.restaurants = result['restaurants'];
                });
        }

        function searchLocalRes(keyword) {
            restaurantService
                .searchRestaurant(keyword)
                .then(function (response) {
                    model.localRestaurants = response.data;
                })
        }

        function searchUserByUsername(username) {
            return userService
                .findUserByUserName(username)
                .then(function (response) {
                    //todo : cannot find user
                    model.usersResult = response.data;
                });
        }

        function goToLocalResDetail(restaurantId) {
            $location.url("/restaurant/details/"+restaurantId);
        }

        function goToUserDetail(userResultId) {
            $location.url("/user/detail/"+ model.usersResult._id);
        }
    }

})();