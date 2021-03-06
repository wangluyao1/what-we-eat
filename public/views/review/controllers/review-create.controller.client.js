/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ReviewCreateController", ReviewCreateController);

    function ReviewCreateController($routeParams,restaurantService,reviewService,$location,user,userService) {
        var model = this;

        model.title = "Write Review";
        model.reviewId = $routeParams['reviewId'];

        model.save = save;
        model.send = send;
        model.logout = logout;

        function init() {
            if(user._id){
                model.logged = true;
            } else{
                model.logged = false;
            }
            return reviewService
                .findReviewById(model.reviewId)
                .then(function (response) {
                    model.review = response.data;
                    model.restaurantId = model.review.restaurant;
                    return restaurantService
                        .findRestaurantById(model.restaurantId)
                        .then(function (response) {
                            model.restaurant = response.data;
                        })
                });
        }

        init();

        function save() {
            return reviewService
                .updateReview(model.review._id,model.review)
                .then(function (response) {
                    $location.url("user/reviews");
                })
        }

        function send() {
            return reviewService.updateReview(model.review._id,model.review)
                .then(function (response) {
                    return reviewService
                        .publishReview(model.review._id)
                        .then(function (response) {
                            $location.url("user/reviews");
                        })
                });
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


