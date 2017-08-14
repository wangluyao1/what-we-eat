/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var restaurantSchema = mongoose.Schema({
    manager:{type:mongoose.Schema.ObjectId,ref:"UserModel"},
    key:String,
    name:String,
    address:String,
    //menu:[{type:mongoose.Schema.ObjectId,ref:"PlateModel"}],
    dateCreated: {type:Date,default:Date.now}
},{collection:"restaurant"});
module.exports = restaurantSchema;
