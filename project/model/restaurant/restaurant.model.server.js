/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var restaurantSchema = require("./restaurant.schema.server");
var restaurantModel = mongoose.model("RestaurantModel",restaurantSchema);

module.exports = restaurantModel;

restaurantModel.createRestaurant = createRestaurant;
restaurantModel.updateRestaurant = updateRestaurant;
restaurantModel.addPlateForRes = addPlateForRes;
restaurantModel.deletePlateForRes = deletePlateForRes;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.findRestaurantByUser = findRestaurantByUser;
restaurantModel.findAllPlatesByRes = findAllPlatesByRes;
restaurantModel.deleteRestaurant = deleteRestaurant;


function createRestaurant(res) {
    var userModel = require("../user/user.model.server");
    return restaurantModel
        .create(res)
        .then(function (restaurantDoc) {
            var rId = restaurantDoc._id;
            restaurantModel
                .findRestaurantById(rId)
                .then(function (rest) {
                    if(!rest.key){
                        rest.key = rest._id;
                        rest.save();
                    }
                });
            return userModel
                .bindRestaurant(res.manager,rId)
                .then(function (status) {
                    return rId;
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
    return restaurantModel.findById(resId);
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
                .findPlatesByRes(resId)
                .then(function (plates) {
                    plates.forEach(function (plate) {
                        return plateModel.deletePlate(plate);
                    })
                })
        });
}