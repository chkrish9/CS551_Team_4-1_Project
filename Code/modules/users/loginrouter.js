const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');
const UserGroup = require('../../models/user/usergroup');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 86400 //1day
                });
                UserGroup.getUserGroupByUserId(user._id, (err, data) => {
                    if (err) throw err;
                    var usergroups = data.filter(element => {
                        return element.users.length > 0;
                    });
                    let privillages = [];
                    for (var i = 0; i < usergroups.length; i++) {
                        console.log(usergroups[i]);
                        for (var j = 0; j < usergroups[i].privillages.length; j++) {
                            console.log(usergroups[i].privillages[j]);
                            if (privillages.indexOf(usergroups[i].privillages[j]) < 0) {
                                privillages.push(usergroups[i].privillages[j]);
                            }
                        }
                    }
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                        },
                        privillages: privillages
                    });
                });
               
            } else {
                return res.json({ success: false, msg: "Invalid Username/Password." });
            }
        });
    });
});


module.exports = router;