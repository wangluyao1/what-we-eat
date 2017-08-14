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
restaurantModel.findMenu = findMenu;
restaurantModel.deleteRestaurant = deleteRestaurant;

function createRestaurant(res) {
    return restaurantModel.createRestaurant(res);
}

function updateRestaurant(resId,newRes) {
    return restaurantModel.update({_id:resId},{$set:newRes});
}

function findMenu(resId) {
    var plateModel = require("../plate/plate.model.server");
    return plateModel
        .findPlatesByRes(resId);
}

function findRestaurantById(resId) {
    return restaurantModel.findById(resId);
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