/**
 * Created by Luyao on 8/13/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ResDetailController", ResDetailController);

    function ResDetailController(resSearchService, $routeParams,restaurantService,userService,user) {
        var model = this;

        model.title = "Restaurant Detail";
        model.currentUser = user;
        model.restaurantKey = $routeParams['restaurantKey'];
        model.star = star;
        model.unstar = unstar;
        model.getHour = getHour;

        function init() {
            resSearchService.searchWithKey(model.restaurantKey)
                .then(function (response) {
                    model.info = response.data;
                    model.hours = model.getHour(model.info.restaurant.hours);
                });
            resSearchService.searchMenuWithKey(model.restaurantKey)
                .then(function (response) {
                    model.menu = response.data;
                });
            checkStar();
        }

        init();

        function checkStar() {
            return userService.getStarList(model.currentUser._id)
                .then(function (response) {
                    var list = response.data;
                    if(list.find(sameKey)){
                        model.starred = true;
                        model.unstarred = false;
                    } else{
                        model.unstarred = true;
                        model.starred = false;
                    }
                })
        }

        function sameKey(restaurant) {
            return restaurant.key === model.restaurantKey;
        }

        function getHour(hourInfo) {
        //todo
        }

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
                    checkStar();
                });
        }

        function unstar() {
            return restaurantService
                .findResByKey(model.restaurantKey)
                .then(function (response) {
                    var restaurant = response.data;
                    return userService
                        .unstarRes(model.currentUser._id,restaurant._id)
                        .then(function () {
                            checkStar();
                        });
                })
        }
    }
})();
