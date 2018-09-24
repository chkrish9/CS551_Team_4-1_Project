const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

router.post("/add",(req, res, next)=>{
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to register user"});
        }else{
            res.json({success : true, msg : "User registered"});
        }
    });
});
router.post("/register",(req, res, next)=>{
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to register user"});
        }else{
            res.json({success : true, msg : "User registered"});
        }
    });
});
router.post("/delete",(req, res, next)=>{
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success : false, msg : "Failed to register user"});
        }else{
            res.json({success : true, msg : "User registered"});
        }
    });
});

module.exports = router;