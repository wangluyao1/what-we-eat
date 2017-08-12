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
    phone: String,
    roles: {type:String,enum:['USER','ADMIN','RESTAURANT'],default:'USER'},
    Posts: String,
    dateCreated: {type:Date,default:Date.now}
    },{collection:"user"});
module.exports = userSchema;