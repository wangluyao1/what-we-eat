/**
 * Created by Luyao on 7/27/2017.
 */
var app = require('../../express');
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var facebookConfig = {
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL
// };
var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));


// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
// function facebookStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserfindUserByFacebookId(profile.id)
//         .then(
//             function (user) {
//                 if (user) {
//                     return done(null, user);
//                 } else {
//                     var email = profile.emails[0].value;
//                     var emailParts = email.split("@");
//                     var newFacebookUser = {
//                         username: emailParts[0],
//                         firstName: profile.name.givenName,
//                         lastName: profile.name.familyName,
//                         email: email,
//                         google: {
//                             id: profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newFacebookUser);
//                 }
//             },
//             function (err) {
//                 if (err) {
//                     return done(err);
//                 }
//             }
//         )
//         .then(
//             function (user) {
//                 return done(null, user);
//             },
//             function (err) {
//                 if (err) {
//                     return done(err);
//                 }
//             }
//         );
// }

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)//{username: username, password: password})
        .then(
            function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

// app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/#/user',
//         failureRedirect: '/#/login'
//     }));


app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername);
app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.get('/api/checkLogin', checkLogin);
//app.get('/all/users',getAllUsers);

// function getAllUsers(req,res) {
//     res.send(userData);
// }

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

// function logout(req, res) {
//     req.logOut();
//     res.send(200);
// }

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        })
    // var date = new Date();
    // user._id = (date.getTime()).toString();
    // userData.push(user);
    // res.send(user);
}

function findUserByUsername(req, res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in userData){
    //     if(userData[u].username === username){
    //         res.send(userData[u]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function findUserByCredentials(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in userData){
    //     if(userData[u].username === username && userData[u].password === password){
    //         res.send(userData[u]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        })
    // for(var u in userData){
    //     if(userData[u]._id === userId){
    //         res.send(userData[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in userData) {
    //     if (userData[u]._id === userId) {
    //         userData[u] = user;
    //         res.send(user);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in userData) {
    //     if (userData[u]._id === userId) {
    //         userData.splice(u, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}