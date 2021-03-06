/**
 * Created by Luyao on 8/14/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("restaurantService", restaurantService);

    function restaurantService($http) {

        var api = {
            "createRestaurant":createRestaurant,
            "findRestaurantById":findRestaurantById,
            "searchRestaurant":searchRestaurant,
            "findPlatesByResId":findPlatesByResId,
            "findResByKey":findResByKey,
            "updateRestaurant":updateRestaurant,
            "deleteRestaurant":deleteRestaurant,
            "allRestaurants":allRestaurants
        };
        return api;

        function allRestaurants() {
            var url ="/api/allRestaurants";
            return $http.get(url);
        }

        function createRestaurant(restaurant) {
            var url = "/api/restaurant";
            return $http.post(url,restaurant);
        }

        function findRestaurantById(resId) {
            var url = "/api/restaurant/"+resId;
            return $http.get(url);
        }

        function searchRestaurant(keyword) {
            var url = "/api/search/restaurant/"+keyword;
            return $http.get(url);
        }

        function findResByKey(resKey) {
            var url = "/api/restaurant/key/"+resKey;
            return $http.get(url);
        }

        function findPlatesByResId(resId) {
            var url = "/api/restaurant/"+resId+"/menu";
            return $http.get(url);
        }

        function updateRestaurant(resId,restaurant) {
            var url = "/api/restaurant/"+resId;
            return $http.put(url,restaurant);
        }

        function deleteRestaurant(resId) {
            var url = "/api/restaurant/"+resId;
            return $http.delete(url);
        }

    }
})();
