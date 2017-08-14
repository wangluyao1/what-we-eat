/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    name:String,
    address:String,
    //menu:[{type:mongoose.Schema.ObjectId,ref:"PlateModel"}],

    dateCreated: {type:Date,default:Date.now}
},{collection:"user"});
module.exports = userSchema;
