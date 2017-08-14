/**
 * Created by Luyao on 8/8/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: {type: String,required:true,unique:true} ,
    password: String,
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    },
    firstName: String,
    lastName: String,
    email: String,
    photo: String,
    phone: String,
    roles: {type:String,enum:['USER','ADMIN','MANAGER'],default:'USER'},
    //restaurantsList: String,
    restaurant:{type:mongoose.Schema.ObjectId,ref:"RestaurantModel"},
    followings:[{type:mongoose.Schema.ObjectId,ref:"RelationModel"}],
    followers:[{type:mongoose.Schema.ObjectId,ref:"RelationModel"}],
    dateCreated: {type:Date,default:Date.now}
    },{collection:"user"});
module.exports = userSchema;
