/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ReviewEditController", ReviewEditController);

    function ReviewEditController($routeParams,restaurantService,reviewService,$location) {
        var model = this;

        model.title = "Edit Review";
        model.restaurantId = $routeParams['restaurantId'];
        model.reviewId = $routeParams['reviewId'];

        model.save = save;
        model.send = send;

        //todo: check user host
        function init() {
            return reviewService
                .findReviewById(model.reviewId)
                .then(function (response) {
                    model.review = response.data;
                    return restaurantService
                        .findRestaurantById(model.restaurantId)
                        .then(function (response) {
                            model.restaurant = response.data;
                        })
                });
        }

        function save() {
            return reviewService
                .updateReview(model.review._id,model.review)
                .then(function (response) {
                    $location.url("restaurant/details/"+model.restaurantId);
                })
        }

        function send() {
            model.save();
            return reviewService
                .publishReview(model.review._id)
                .then(function (response) {
                    $location.url("restaurant/details/"+model.restaurantId);
                })
        }

        init();
    }
})();


