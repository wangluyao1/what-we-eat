/**
 * Created by Luyao on 8/11/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("SearchController", SearchController)

    function SearchController($location,userService,resSearchService) {
        var model = this;

        model.searchRestaurantsByAddress = searchRestaurantsByAddress;
        model.searchUserByUsername = searchUserByUsername;
        model.goToUserDetail = goToUserDetail;

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

        function searchUserByUsername(username) {
            return userService
                .findUserByUserName(username)
                .then(function (response) {
                    //todo : cannot find user
                    model.usersResult = response.data;
                });
        }

        function goToUserDetail(userResultId) {
            $location.url("/user/detail/"+ model.usersResult._id);
        }
    }

})();