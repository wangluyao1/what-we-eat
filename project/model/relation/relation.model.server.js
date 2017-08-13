/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var relationSchema = require("./relation.schema.server");
var relationModel = mongoose.model("RelationModel",relationSchema);
var userModel = mongoose.model("UserModel",userSchema);

relationModel.createRelation = createRelation;
;
relationModel.findRelationById = findRelationById;
//relationModel.findAllLikes = findAllLikes;
relationModel.findFollow = findFollow;
relationModel.findAllFollowers = findAllFollowers;
relationModel.findAllFollowings = findAllFollowings;
relationModel.deleteRelation = deleteRelation;

modules.export = relationModel;

function createRelation(relation) {
    return relationModel.createRelation(relation);
}

function findRelationById(relationId) {
    return relationModel.findById(relationId);
}

function findFollow(from,toUser) {
    return relationModel.findOne({from:from,toUser:toUser,type:follow});
}

function findAllFollowers(toUser) {
    return relationModel.find({toUser:toUser,type:"FOLLOW"});
}

function findAllFollowings(from) {
    return relationModel.find({from:from});
}

function deleteRelation(relationId) {
    return relationModel.remove(relationId);
}

