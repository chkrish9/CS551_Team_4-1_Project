const express = require('express');
const router = express.Router();
const passport = require('passport');
const Import = require('../../models/settings/import');
const Settings = require('../../models/settings/import')


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