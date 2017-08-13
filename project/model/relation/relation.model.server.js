/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var relationSchema = require("./relation.schema.server");
var relationModel = mongoose.model("RelationModel",relationSchema);
var userModel = mongoose.model("UserModel",userSchema);

relationModel.createRelation = createRelation;
relationModel.deleteRelation = deleteRelation;
//relationModel.findRelationById = findRelationById;
//relationModel.findAllLikes = findAllLikes;
relationModel.findFollow = findFollow;
relationModel.findAllFollowers = findAllFollowers;
relationModel.findAllFollowings = findAllFollowings;

modules.export = relationModel;

function createRelation(relation) {

}


