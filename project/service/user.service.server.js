/**
 * Created by Luyao on 7/27/2017.
 */
var app = require('../../express');
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

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
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new LocalStrategy(localStrategy));

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
app.get('/api/checkLogout',logout);
app.get('/api/allUsers',getAllUsers);

//star list
app.get('/api/user/:userId/starRestaurant/:resId',star);
app.get('/api/user/:userId/unstarRestaurant/:resId',unstar);
app.get('/api/user/:userId/starList',starList);

//follow
app.get('/api/user/follow/:tuid',follow);
app.get('/api/user/unfollow/:tuid',unfollow);
app.get('/api/user/:userId/followers',findFollowers);
app.get('/api/user/:userId/followings',findFollowings);

//review
app.get('/api/user/:userId/reviews',userAllReviews);

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


function getAllUsers(req,res) {
    return userModel.allUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(404).send(err);
        })}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        })
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

//star list
function star(req,res) {
    var userId = req.params.userId;
    var resId = req.params.resId;
    userModel
        .starResForUser(userId,resId)
            .then(function (status) {
                res.json(status);
            },function (err) {
                res.sendStatus(500).send(err);
            });
}

function unstar(req,res) {
    var userId = req.params.userId;
    var resId = req.params.resId;
    userModel
        .unstarResForUser(userId,resId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        });
}

function starList(req,res) {
    var userId = req.params.userId;
    userModel
        .findStarredRes(userId)
        .then(function (restarurants) {
            res.json(restarurants);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}

//follow
function follow(req,res) {
    var toUserId = req.params.tuid;
    var fromUserId = req.user._id;
    userModel
        .follow(fromUserId,toUserId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}

function unfollow(req,res) {
    var toUserId = req.params.tuid;
    var fromUserId = req.user._id;
    userModel
        .unfollow(fromUserId,toUserId)
        .then(function (status) {
            res.json(status);
        },function (err) {
            res.sendStatus(500).send(err);
        })
}

function findFollowers(req,res) {
    var userId = req.params.userId;
    userModel
        .findAllFollowersByUserId(userId)
        .then(function (followers) {
            res.json(followers);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function findFollowings(req,res) {
    var userId = req.params.userId;
    userModel
        .findAllFollowingsByUserId(userId)
        .then(function (followings) {
            res.json(followings);
        },function (err) {
            res.sendStatus(404).send(err);
        })
}

function userAllReviews(req,res) {
    var userId = req.params.userId;
    userModel
        .getReviewsByUser(userId)
        .then(function (reviews) {
            res.json(reviews);
        },function (err) {
            res.sendStatus(404).send(err);
        });
}