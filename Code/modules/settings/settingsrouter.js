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

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description : req.body.description
    };
    Import.updateLine(id, update, (err, line) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});



module.exports = router;