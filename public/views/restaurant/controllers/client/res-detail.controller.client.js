/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailController", ResDetailController);

    function ResDetailController(resSearchService, $routeParams,restaurantService,userService,user) {
        var model = this;

        model.currentUser = user;
        model.restaurantKey = $routeParams['restaurantKey'];
        model.star = star;
        model.unstar = unstar;

        function init() {
            resSearchService.searchWithKey(model.restaurantKey)
                .then(function (response) {
                    model.info = response.data;
                });
            resSearchService.searchMenuWithKey(model.restaurantKey)
                .then(function (response) {
                    model.menu = response.data;
                })
        }

        init();

        function star() {
            var newRestaurant = {key:model.restaurantKey,type:"SEARCH",
                name:model.info.restaurant.name,
                address:model.info.restaurant.streetAddress+", "+ model.info.restaurant.city+", "+model.info.restaurant.state};
            return restaurantService
                .findResByKey(model.restaurantKey)
                .then (function (resp){
                    if(resp.data){
                    return starUserHelper(resp.data);
                    } else {
                        return restaurantService.createRestaurant(newRestaurant)
                            .then(function (response) {
                                var restaurant = response.data;
                                return starUserHelper(restaurant);
                            })
                    }
                    });
        }

        function starUserHelper(restaurant) {
            return userService
                .starRes(model.currentUser._id,restaurant._id)
                .then(function () {
                    model.starred = true;
                });
        }

        function unstar() {
            return restaurantService
                .findResByKey(model.restaurantKey)
                .then(function (response) {
                    var restaurant = response.data;
                    return userService
                        .unstarRes(model.currentUser._id,restaurant._id);
                })
        }
    }
})();
