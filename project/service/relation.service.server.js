/**
 * Created by Luyao on 8/12/2017.
 */
var app = require('../../express');
var relationModel = require("../model/relation/relation.model.server");

app.post('/api/relation',createRelation);
app.get('/api/relation/follow',findFollow);
app.get('/api/relation/following/:fuid',findFollowByFrom);
app.get('/api/relation/follower/:tuid',findFollowByToUser);
app.get('/api/relation',deleteRelation);
app.get('/api/relation/all',allRelations);

function allRelations(req,res) {
    relationModel.findAllRelations()
        .then(function (relations) {
            res.json(relations);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function createRelation(req,res) {
    var newRelation = req.body;
    relationModel
        .createRelation(newRelation)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}

function findFollow(req,res) {
    var toUser = req.query.toUser;
    var from = req.query.from;
    relationModel
        .findFollow(from,toUser)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowByFrom(req,res) {
    var from = req.params.from;
    relationModel
        .findAllFollowings(from)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowByToUser(req,res) {
    var toUser = req.params.toUser;
    relationModel
        .findAllFollowers(toUser)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteRelation(req,res) {
    var relationId = req.params.relationId;
    relationModel
        .deleteRelation(relationId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}