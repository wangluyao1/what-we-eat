/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("ReviewEditController", ReviewEditController);

    function ReviewEditController($routeParams,restaurantService,reviewService,$location,user) {
        var model = this;

        model.title = "Edit Review";
        model.reviewId = $routeParams['reviewId'];


        model.deleteReview = deleteReview;
        model.save = save;
        model.send = send;
        model.logout = logout;

        //todo: check user host
        function init() {
            if(user._id){
                model.logged = true;
                model.isUser = (user.roles === 'USER');
                model.isManager = (user.roles === 'MANAGER');
                model.isAdmin = (user.roles === 'ADMIN');
            } else{
                model.logged = false;
            }
            return reviewService
                .findReviewById(model.reviewId)
                .then(function (response) {
                    model.review = response.data;
                    return restaurantService
                        .findRestaurantById(model.review.restaurant)
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
                    $location.url("/user/reviews");
                })
        }

        function send() {
            model.save();
            return reviewService
                .publishReview(model.review._id)
                .then(function (response) {
                    $location.url("restaurant/details/"+model.restaurant._id);
                })
        }

        function deleteReview() {
            return reviewService
                .deleteReview(model.reviewId)
                .then(function (response) {
                    $location.url("/user/reviews");
                })
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


