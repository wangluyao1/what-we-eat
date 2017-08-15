/**
 * Created by Luyao on 8/14/2017.
 */
var app = require('../../express');
var restaurantModel = require("../model/restaurant/restaurant.model.server");

app.post("/api/restaurant",createRestaurant);
app.get("/api/restaurant/:rId",findResById);
app.get("/api/restaurant/key/:resKey",finResByKey);
app.get("/api/restaurant/:rId/menu",findMenuByResId);
app.put("/api/restaurant/:rId",updateRestaurant);
app.delete("/api/restaurant/:rId",deleteRestaurant);

function createRestaurant(req,res) {
    var newRes = req.body;
    return restaurantModel
        .createRestaurant(newRes)
        .then(function (restaurant) {
            res.json(restaurant);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}

function findResById(req,res) {
    var resId = req.params.rId;
    return restaurantModel
        .findRestaurantById(resId)
        .then(function (restaurant) {
            res.json(restaurant);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function finResByKey(req,res) {
    var resKey = req.params.resKey;
    return restaurantModel
        .findResByKey(resKey)
        .then(function (restaurant) {
            res.json(restaurant);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function findMenuByResId(req,res) {
    var resId = req.params.rId;
    return restaurantModel
        .findAllPlatesByRes(resId)
        .then(function (menu) {
            res.json(menu);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateRestaurant(req,res) {
    var resId = req.params.rId;
    var newRes = req.body;
    return restaurantModel
        .updateRestaurant(resId,newRes)
        .then(function (restaurant) {
            res.json(restaurant);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteRestaurant(req,res) {
    var resId = req.params.rId;
    return restaurantModel
        .deleteRestaurant(resId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}