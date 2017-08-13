/**
 * Created by Luyao on 8/8/2017.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel",userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGoogleId = findUserByGoogleId;

//follow
userModel.addTo = addToArray;
userModel.deleteFromArray = deleteFromArray;
userModel.follow = follow;
userModel.unfollow = unfollow;
userModel.addFollower = addFollower;
userModel.addFollowing = addFollowing;
userModel.deleteFollowing = deleteFollowing;
userModel.deleteFollower = deleteFollower;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username:username});
}
function  findUserByCredentials(username,password) {
    return userModel.findOne({username:username},{password:password});
}

function updateUser(userId,user) {
    user._id = userId;
    return userModel.update({_id:userId},{$set:user});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function addToArray(userId,where,toAdd) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.get(where).push(toAdd);
            return user.save();
        })
}

function deleteFromArray(userId,arrayName,toDeleteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var array = user.get(arrayName);
            var index = array.indexOf(toDeleteId);
            user.get(arrayName).splice(index,1);
            user.save();
        })
}

function addFollowing(userId,toAddRelationId) {
    return userModel
        .addTo(userId,"followings",toAddRelationId);
}

function deleteFollowing(userId,toDeleteRelationId) {
    return userModel.deleteFromArray(userId,"followings",toDeleteRelationId);
}

function addFollower(userId,toAddRelationId) {
    return userModel
        .addTo(userId,"followers",toAddRelationId);
}

function deleteFollower(userId,toDeleteRelationId) {
    return userModel.deleteFromArray(userId,"followers",toDeleteRelationId);
}

function follow(fromId,toId) {
    var relationModel = require("../relation/relation.model.server");
    return relationModel
        .createRelation({from:fromId,toUser:toId,type:"FOLLOW"})
        .then(function (newRelation) {
                userModel.addFollowing(fromId, newRelation)
                    .then(function () {
                       return userModel.addFollower(toId, newRelation);
                    })
            }
            );
}

function unfollow(fromId,toId) {
    var relationModel = require("../relation/relation.model.server");
    return relationModel
        .findFollow(fromId,toId)
        .then(function (follow) {
            return relationModel
                .deleteRelation(follow._id)
                .then(function () {
                    return userModel
                        .deleteFollower(toId,follow._id)
                        .then(function () {
                            return userModel
                                .deleteFollowing(fromId,follow._id);
                        })
                });
        })
}



