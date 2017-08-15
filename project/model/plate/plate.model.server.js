/**
 * Created by Luyao on 8/13/2017.
 */
var mongoose = require("mongoose");
var plateSchema = require("./plate.schema.server");
var plateModel = mongoose.model("PlateModel",plateSchema);

module.exports = plateModel;

plateModel.createPlate = createPlate;
plateModel.updatePlate = updatePlate;
plateModel.findPlateById = findPlateById;
plateModel.findPlatesByRes = findPlatesByRes;
plateModel.deletePlate = deletePlate;
plateModel.deletePlatesForRes = deletePlatesForRes;

function createPlate(plate) {
    var restaurantModel = require("../restaurant/restaurant.model.server");
    return plateModel
        .create(plate)
        .then(function (plateDoc) {
            return restaurantModel
                   .addPlateForRes(plate.restaurant,plateDoc._id);
        });
}

function updatePlate(plateId,newPlate) {
    return plateModel.update({_id:plateId},{$set:newPlate});
}

function findPlateById(plateId) {
    return plateModel.findById(plateId);
}

function findPlatesByRes(resId) {
    return plateModel.find({restaurant:resId})
        .then(function (plates) {
            return plates;
        });
}

function deletePlate(plateId) {
    var restaurantModel = require("../restaurant/restaurant.model.server");
    return plateModel
        .findById(plateId)
        .then(function (plate) {
            var resId = plate.restaurant;
            return restaurantModel
                .findByIdAndRemove(plateId)
                .then(function () {
                    return restaurantModel
                        .deletePlateForRes(resId,plateId);
                });
        });
}

function deletePlatesForRes(resId) {
    return plateModel.deleteMany({restaurant:resId});
}