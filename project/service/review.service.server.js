/**
 * Created by Luyao on 8/15/2017.
 */
var app = require('../../express');
var reviewModel = require("../model/review/review.model.server");

app.post("/api/review",createReview);
app.get("/api/review/:reviewId/publish",publishReview);
app.put("/api/review/:reviewId",updateReview);
app.get("/api/review/:reviewId",getReviewById);
app.delete("/api/review/:reviewId",deleteReview);

function createReview(req,res) {
    var newReview = req.body;
    return reviewModel
        .createReview(newReview)
        .then(function (review) {
            res.json(review);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}

function publishReview(req,res) {
    var reviewId = req.params['reviewId'];
    return reviewModel
        .publishReview(reviewId)
        .then(function (review) {
            res.send(review);
        },function (err) {
            res.send(500).sendStatus(err);
        });
}

function updateReview(req,res) {
    var reviewId = req.params['reviewId'];
    var newReview = req.body;
    return reviewModel
        .updateReview(reviewId,newReview)
        .then(function (review) {
            res.json(review);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}


function getReviewById(req,res) {
    var reviewId = req.params['reviewId'];
    return reviewModel
        .findReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function deleteReview(req,res) {
    var reviewId = req.params['reviewId'];
    return reviewId
        .deleteReview(reviewId)
        .then(function (review) {
            res.json(review);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}
