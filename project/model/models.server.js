/**
 * Created by Luyao on 8/8/2017.
 */
var mongoose = require("mongoose");
var q = require('q');

var connectionString = 'mongodb://localhost/what-we-eat'; // for local
if(process.env.MLAB_USERNAME_PROJECT) { // check if running remotely
    var username = process.env.MLAB_USERNAME_PROJECT; // get from environment
    var password = process.env.MLAB_PASSWORD_PROJECT;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds161295.mlab.com:61295/heroku_60jc0fzg'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;