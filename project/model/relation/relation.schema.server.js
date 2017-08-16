/**
 * Created by Luyao on 8/11/2017.
 */
var mongoose = require("mongoose");
var relationSchema = mongoose.Schema({
    from:{type:mongoose.Schema.ObjectId,ref:"UserModel"},
    toUser:{type:mongoose.Schema.ObjectId,ref:"UserModel"},
    //toRL:{},
    type:{type:String,enum:["LIKE","FOLLOW"]},
    //content: String,
    dateCreated: {type:Date,default:Date.now}
},{collection:"relation"});
module.exports = relationSchema;
