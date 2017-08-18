/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminRestaurantController", AdminRestaurantController);

    function AdminRestaurantController(restaurantService, $location,userService) {
        var model = this;
        model.title = "Manage Restaurants";

        model.addRes = addRes;
        model.deleteRes = deleteRes;
        model.goToEdit = goToEdit;
        model.logout = logout;


        function init() {
            refreshRes();
        }

        init();

        function addRes(newRes) {
            return restaurantService
                .createRestaurant(newRes)
                .then(function (response) {
                    refreshRes();
                })
        }

        function deleteRes(resId) {
            return restaurantService
                .deleteRestaurant(resId)
                .then(function (response) {
                    refreshRes();
                })
        }

        function refreshRes() {
            return restaurantService
                .allRestaurants()
                .then(function (response) {
                    model.restaurants = response.data;
                })
        }

        function goToEdit(restaurantId) {
            $location.url("/admin/restaurant/"+restaurantId);
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
