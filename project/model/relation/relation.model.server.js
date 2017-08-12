/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var relationSchema = require("./relation.schema.server");
var relationModel = mongoose.model("RelationModel",relationSchema);

relationModel.createRelation = createRelation;
relationModel.deleteRelation = deleteRelation;
relationModel.findRelationById = findLikeById;
relationModel.findAllLikes = findAllLikes;
relationModel.findAllFollowers = findAllFollowers;
relationModel.findAllFollowings = findAllFollowings;


