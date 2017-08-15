/**
 * Created by Luyao on 8/14/2017.
 */
var mongoose = require("mongoose");
var plateSchema = mongoose.Schema({
    restaurant:{type:mongoose.Schema.ObjectId,ref:"RestaurantModel"},
    name:String,
    description:String,
    price:String,
    dateCreated: {type:Date,default:Date.now}
},{collection:"plate"});

module.exports = plateSchema;
