/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminReviewController", AdminReviewController);

    function AdminReviewController(reviewService, $location,userService) {
        var model = this;
        model.title = "Manage Reviews";

        model.addReview = addReview;
        model.deleteReview = deleteReview;
        model.goToEdit = goToEdit;
        model.logout =logout;
        model.saveReview = saveReview;

        function init() {
            model.notEdit = true;
            refreshReview();
        }

        init();

        function addReview(review) {
            return reviewService
                .createReview(review)
                .then(function () {
                    refreshReview();
                })
        }

        function deleteReview(reviewId) {
            return reviewService
                .deleteReview(reviewId)
                .then(function () {
                    refreshReview();
                })
        }

        function refreshReview() {
            return reviewService
                .allReviews()
                .then(function (response) {
                    model.reviews = response.data;
                })
        }

        function saveReview(review) {
            return reviewService
                .updateReview(review._id,review)
                .then(function (response) {
                    model.alert = "Changes save";
                })
        }

        function goToEdit(review) {
            // $location.url("/restaurant/"+review.restaurant+"/review/"+review._id +"/edit")
            model.notEdit = false;

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