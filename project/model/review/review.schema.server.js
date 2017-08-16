/**
 * Created by Luyao on 8/15/2017.
 */
var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"UserModel"},
    restaurant:{type:mongoose.Schema.ObjectId,ref:"RestaurantModel"},
    content:String,
    //photo:[file]
    type:{type:String,enum:["PUBLIC","PRIVATE"],default:"PRIVATE"}
},{collection:"review"});
module.exports = reviewSchema;
