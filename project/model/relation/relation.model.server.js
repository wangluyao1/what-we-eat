/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var relationSchema = require("./relation.schema.server");
var relationModel = mongoose.model("RelationModel",relationSchema);

relationModel.createRelation = createRelation;
relationModel.findRelationById = findRelationById;
//relationModel.findAllLikes = findAllLikes;
relationModel.findFollow = findFollow;
relationModel.findAllFollowers = findAllFollowers;
relationModel.findAllFollowings = findAllFollowings;
relationModel.deleteRelation = deleteRelation;

module.exports = relationModel;

function createRelation(relation) {
    return relationModel.create(relation);
        // .then(function (newRelation) {
        //     return newRelation;
        // });
}

function findRelationById(relationId) {
    return relationModel
        .findById(relationId)
        .populate('from')
        .exec();
}

function findFollow(from,toUser) {
    return relationModel.findOne({from:from,toUser:toUser,type:"FOLLOW"});
}

function findAllFollowers(toUser) {
    return relationModel.find({toUser:toUser,type:"FOLLOW"});
}

function findAllFollowings(from) {
    return relationModel.find({from:from});
}

function deleteRelation(relationId) {
    return relationModel.findByIdAndRemove(relationId);
}

