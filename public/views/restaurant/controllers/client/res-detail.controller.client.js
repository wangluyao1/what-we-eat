/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailController", ResDetailController);

    function ResDetailController(resSearchService, $routeParams,restaurantService,userService) {
        var model = this;
        model.restaurantKey = $routeParams['restaurantKey'];

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

        function star(la) {
            var newRestaurant = {key:model.restaurantKey,type:"SEARCH"};
            return restaurantService
                .createRestaurant(newRestaurant)
                .then(function (response) {
                    var restaurant = response.data;
                    return userService
                        .
                })
        }
    }
})();
