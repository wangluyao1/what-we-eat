/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("LocalResDetailController", LocalResDetailController);

    function LocalResDetailController($routeParams,restaurantService,user,reviewService,$location) {
        var model = this;

        model.restaurantId = $routeParams['restaurantId'];
        model.writeReview = writeReview;

        function init() {
            return restaurantService
                .findRestaurantById(model.restaurantId)
                .then(function (response) {
                    model.restaurant = response.data;
                });
        }

        init();

        function writeReview() {
            var newReview = {restaurant:model.restaurantId,user:user};
            return reviewService
                .createReview(newReview)
                .then(function (response) {
                    $location.url("/restaurant/"+model.restaurantId+"/review/"+response.data._id);
                })
        }
    }
})();
