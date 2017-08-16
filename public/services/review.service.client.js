/**
 * Created by Luyao on 8/15/2017.
 */
(function () {
    angular
        .module("what-we-eat")
        .service("reviewService", reviewService);

    function reviewService($http) {
        var api = {
            "createReview":createReview,
            "publishReview":publishReview,
            "updateReview":updateReview,
            "findReviewById" :findReviewById,
            "deleteReview":deleteReview
        };
        return api;

        function createReview(newReview) {
            var url = "/api/review";
            return $http.post(url,newReview);
        }

        function updateReview(reviewId,newReview) {
            var url = "/api/review/"+reviewId;
            return $http.put(url,newReview);
        }

        function publishReview(reviewId) {
            var url = "/api/review/"+reviewId+"/publish";
            return $http.get(url);
        }

        function findReviewById(reviewId) {
            var url = "/api/review/"+reviewId;
            return $http.get(url);
        }

        function deleteReview(reviewId) {
            var url = "/api/review/"+reviewId;
            return $http.delete(url);
        }
    }

})();