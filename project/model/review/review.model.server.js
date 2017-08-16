/**
 * Created by Luyao on 8/15/2017.
 */
var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel",reviewSchema);

module.exports = reviewModel;

reviewModel.createReview = createReview;
reviewModel.publishReview =publishReview;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewById =  findReviewById;
reviewModel.deleteReviewByUser = deleteReviewByUser;
reviewModel.deleteReviewByRes = deleteReviewByRes;
reviewModel.findAllReviews = findAllReviews;

function findAllReviews() {
    return reviewModel.find();
}

function createReview(review) {
    var userModel = require("../user/user.model.server");
    return reviewModel
        .create(review)
        .then(function (reviewDoc) {
            return userModel
                .addReviewForUser(review.user,reviewDoc._id)
                .then(function () {
                    return reviewDoc;
                });
        });
}

function publishReview(reviewId) {
    var restaurantModel = require("../restaurant/restaurant.model.server");
    return reviewModel
           .findById(reviewId)
        .then(function (review) {
            review.type = "PUBLIC";
            review.save();
            return restaurantModel
                .addReviewForRes(review.restaurant,reviewId);
        })
}

function updateReview(reviewId,newReview) {
    return reviewModel.findOneAndUpdate({_id:reviewId},{$set:newReview});
}

function findReviewById(reviewId) {
    return reviewModel.findById(reviewId);
}

function deleteReview(reviewId) {
    var restaurantModel = require("../restaurant/restaurant.model.server");
    return reviewModel
        .findOneAndRemove(reviewId)
        .then(function (review) {
            return restaurantModel
                .removeReviewForRes(review.restaurant,reviewId)
                .then(function () {
                    var userModel = require("../user/user.model.server");
                    return userModel
                        .deleteReviewForUser(review.user,reviewId);
                });
        })
}

function deleteReviewByUser(userId) {
    return reviewModel.deleteMany({user:userId});
}

function deleteReviewByRes(resID) {
    return reviewModel.deleteMany({restaurant:resID});
}

