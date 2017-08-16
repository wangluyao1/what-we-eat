/**
 * Created by Luyao on 8/16/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .controller("AdminReviewController", AdminReviewController);

    function AdminReviewController(reviewService, $location) {
        var model = this;
        model.title = "Manage Reviews";

        model.addReview = addReview;
        model.deleteReview = deleteReview;
        model.goToEdit = goToEdit;

        function init() {
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

        function goToEdit(review) {
            $location.url("/restaurant/"+review.restaurant+"/review/"+review._id +"/edit")
        }

    }
})();