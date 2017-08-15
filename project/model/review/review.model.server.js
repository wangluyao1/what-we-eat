/**
 * Created by Luyao on 8/15/2017.
 */
var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel",reviewSchema);

module.exports = reviewModel;

reviewModel.createReview = createReview;


function createReview(review) {
    reviewModel
        .create(review)
        .then(function (reviewDoc) {

        })
    
}