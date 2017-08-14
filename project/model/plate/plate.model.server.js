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

function createPlate(plate) {
    return plateModel.create(plate);
}

function updatePlate(plateId,newPlate) {
    return plateModel.update({_id:plateId},{$set:newPlate});
}

function findPlateById(plateId) {
    return plateModel.findById(plateId);
}

function findPlatesByRes(resId) {
    return plateModel.find({restaurant:resId});
}

function deletePlate(plateId) {
    return plateModel.findByIdAndRemove(plateId);
}