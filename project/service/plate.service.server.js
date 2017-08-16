/**
 * Created by Luyao on 8/14/2017.
 */
var app = require('../../express');
var plateModel = require("../model/plate/plate.model.server");

app.post("/api/plate",createPlate);
app.get("/api/plate/:pId",findPlateById);
app.put("/api/plate/:pId",updatePlate);
app.delete("/api/plate/:pId",deletePlate);
app.get("api/plate/all",allPlates);

function allPlates(req,res) {
    return plateModel
        .allPlates()
        .then(function (plates) {
            res.json(plates);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function createPlate(req,res) {
    var newPlate = req.body;
    return plateModel
        .createPlate(newPlate)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}

function findPlateById(req,res) {
    var plateId = req.params.pId;
    return plateModel
        .findPlateById(plateId)
        .then(function (plate) {
            res.json(plate);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}


function updatePlate(req,res) {
    var plateId = req.params.pId;
    var newPlate = req.body;
    return plateModel
        .updatePlate(plateId,newPlate)
        .then(function (plate) {
            res.json(plate);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}

function deletePlate(req,res) {
    var plateId = req.params.pId;
    return plateModel
        .deletePlate(plateId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}