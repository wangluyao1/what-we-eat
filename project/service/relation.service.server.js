/**
 * Created by Luyao on 8/12/2017.
 */
var app = require('../../express');
var relationModel = require("../model/relation/relation.model.server");

app.post('/api/relation',createRelation);
app.get('/api/relation/follow',findFollow);
app.put('/api/relation/follow/:followId',updateFollow);
app.get('/api/relation/following/:fuid',findFollowByFrom);
app.get('/api/relation/follower/:tuid',findFollowByToUser);
app.delete('/api/relation/:relationId',deleteRelation);
app.get('/api/allRelations',allRelations);

function allRelations(req,res) {
    return relationModel.findAllRelations()
        .then(function (relations) {
            res.json(relations);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function createRelation(req,res) {
    var newRelation = req.body;
    return relationModel
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
    return relationModel
        .findFollow(from,toUser)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateFollow(req,res) {
    var followId = req.params.followId;
    var newFollow = req.body;
    return relationModel
        .updateRelation(followId,newFollow)
        .then(function (follow) {
            res.json(follow);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}


function findFollowByFrom(req,res) {
    var from = req.params.from;
    return relationModel
        .findAllFollowings(from)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowByToUser(req,res) {
    var toUser = req.params.toUser;
    return relationModel
        .findAllFollowers(toUser)
        .then(function (followRelation) {
            res.json(followRelation);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteRelation(req,res) {
    var relationId = req.params.relationId;
    return relationModel
        .deleteRelation(relationId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}