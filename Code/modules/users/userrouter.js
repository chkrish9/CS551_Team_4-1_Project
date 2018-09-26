const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');


//Create
router.post('/create', (req, res, next) =>{
    let newUser = new User({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        phone:req.body.phone,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added."});
        }
    });
});

module.exports = router;