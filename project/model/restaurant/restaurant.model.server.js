/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var restaurantSchema = require("./restaurant.schema.server");
var restaurantModel = mongoose.model("RestaurantModel",restaurantSchema);

module.exports = restaurantModel;

restaurantModel.createRestaurant = createRestaurant;
restaurantModel.updateRestaurant = updateRestaurant;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.findResByKey = findResByKey;
restaurantModel.searchResByName = searchResByName;
restaurantModel.deleteRestaurant = deleteRestaurant;

//helper
restaurantModel.addToArray = addToArray;
restaurantModel.deleteFromArray=deleteFromArray;

//user
restaurantModel.delteResForUser = deleteResForUser;
restaurantModel.findRestaurantByUser = findRestaurantByUser;

//plates
restaurantModel.addPlateForRes = addPlateForRes;
restaurantModel.deletePlateForRes = deletePlateForRes;
restaurantModel.findAllPlatesByRes = findAllPlatesByRes;

//review
restaurantModel.addReviewForRes = addReviewForRes;
restaurantModel.removeReviewForRes = removeReviewForRes;
restaurantModel.getReviewsForRes = getReviewsForRes;

function createRestaurant(res) {
    var userModel = require("../user/user.model.server");
    if(res.type === "SEARCH"){
        return restaurantModel
            .create(res);
    }
    return restaurantModel
        .create(res)
        .then(function (restaurantDoc) {
            var rId = restaurantDoc._id;
            return restaurantModel
                .findRestaurantById(rId)
                .then(function (rest) {
                    if (!rest.key) {
                        rest.key = rest._id;
                        rest.save();
                    }
                    if(rest.manager !== undefined){
                        return userModel
                            .bindRestaurant(res.manager, rId)
                            .then(function (status) {
                                return restaurantDoc;
                            });
                    }
                });
        });
}

function updateRestaurant(resId,newRes) {
    newRes._id=resId;
    return restaurantModel.update({_id:resId},{$set:newRes});
}


function addPlateForRes(resId,plate) {
    return restaurantModel
        .findById(resId)
        .then(function (restaurant) {
            restaurant.menu.push(plate);
            return restaurant.save();
        })
}

function deletePlateForRes(resId,plateId) {
    return restaurantModel
        .findById(resId)
        .then(function (restaurant) {
            var index = restaurant.menu.indexOf(plateId);
            restaurant.menu.splice(index,1);
            return restaurant.save();
        })
}

function findRestaurantById(resId) {
    return restaurantModel.findById(resId)
        .populate('reviews')
        .exec();
}

function findResByKey(resKey) {
    return restaurantModel.findOne({key:resKey});
}

function searchResByName(keyword) {
    return restaurantModel
        .find({
            $and:[{type:"LOCAL"},{name: new RegExp(keyword,"i")}]
        });
}

function findAllPlatesByRes(resId) {
    // var plateModel = require("../plate/plate.model.server");
    return restaurantModel
        .findRestaurantById(resId)
        .populate('menu')
        .exec()
        .then(function (restaurant) {
            return restaurant.menu;
        });
}

function findRestaurantByUser(userId) {
    return restaurantModel.find({manager:userId});
}

function deleteRestaurant(resId) {
    var plateModel = require("../plate/plate.model.server");
    return restaurantModel
        .findByIdAndRemove(resId)
        .then(function (res) {
            return plateModel
                .deletePlatesForRes(resId);
        });
}

function deleteResForUser(userId) {
    return restaurantModel.deleteMany({manager:userId});
}

function addReviewForRes(resId,reviewId) {
    return restaurantModel.addToArray(resId,"reviews",reviewId);
}

function removeReviewForRes(resId,reviewId) {
    return restaurantModel.deleteFromArray(resId,"reviews",reviewId);
}

function getReviewsForRes(resId) {
    return restaurantModel
        .findById(resId)
        .populate('reviews')
        .exec()
        .then(function (restaurant) {
            return restaurant.reviews;
        })
}

function addToArray(resId,where,toAdd) {
    return restaurantModel
        .findById(resId)
        .then(function (res) {
            res.get(where).push(toAdd);
            return res.save();
        })
}

function deleteFromArray(resId,arrayName,toDeleteId) {
    return restaurantModel
        .findById(resId)
        .then(function (res) {
            var array = res.get(arrayName);
            var index = array.indexOf(toDeleteId);
            res.get(arrayName).splice(index,1);
            res.save();
        })
}
