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


userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

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

function addWebsite(userId, websiteId) {
    userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId,websiteId) {
    userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index,1);
            return user.save();
        });
}


