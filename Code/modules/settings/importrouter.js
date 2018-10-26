const express = require('express');
const router = express.Router();
const passport = require('passport');
const Import = require('../../models/settings/import');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Import.getLines((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    let newLine = new Line({
        name : req.body.name,
        description : req.body.description
    });
    Import.addLine(newLine, (err, line) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added."});
        }
    });
});

module.exports = router;