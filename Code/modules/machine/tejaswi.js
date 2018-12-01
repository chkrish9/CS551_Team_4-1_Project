onst express = require('express');
const router = express.Router();
const passport = require('passport');
const Line = require('../../models/machine/line');

//Get
router.get('/all',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Line.getLines((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/get/:name',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    var name = req.params.name;
    //console.log(name);
    Line.getLineNames(name,(err, data) => {
        res.json(data);
    });
});

//Create
router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    let newLine = new Line({
        name : req.body.name,
        description : req.body.description
    });
    Line.addLine(newLine, (err, line) =>{
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
    Line.updateLine(id, update, (err, line) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Line.deleteLine(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error',success:false });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    })
});

module.exports = router;
router.get('/all',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Step.getSteps((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});

router.get('/getById/:id',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Step.getStepById(req.params.id, (err, step)=>{
        if(err){
            res.json({success : false, msg : "Failed to Add user."});
        }else{
            res.json({success : true, msg : "User Added.", data:step});
        }
    });
});
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res, next) {
    //console.log(req.body);
    var id = req.params.id;
    var update = {
        name: req.body.name,
        machinegroup: req.body.machinegroup,
        company: req.body.company,
        model: req.body.model,
        dateOfInstall: req.body.dateOfInstall,
        qrCode: req.body.qrCode,
        area: req.body.area,
        line: req.body.line,
        barcode: req.body.barcode,
    };
    update.qrCode = "{ machineName :" + update.name + ",area:" + update.area + ",line:" + update.line + "}"
    Machine.updateMachine(id, update, (err, machineGroup) => {
        if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

//Delete
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res,next) {
    //console.log( req.body);
    var id = req.params.id;
    var update = {
        name : req.body.name,
        description : req.body.description,
        machine : req.body.machine,
        reason: req.body.reason,
        stepgroups: req.body.stepgroups
    };
    Template.updateTemplate(id, update, (err, Template) => {
        if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            res.json({ msg: 'new contact added successfully' });
        }
    });
});

router.post('/create',passport.authenticate('jwt',{session : false}),  (req, res, next) =>{
    let newPart = new Part({
        name : req.body.name,
        description : req.body.description,
        isSerial: req.body.isSerial,
        qrCode : req.body.qrCode,
        availableQuantity:req.body.availableQuantity
    });
    newPart.qrCode = "{ partName :" + newPart.name +"}";
    Part.addPart(newPart, (err, reason) =>{
        if(err){
            res.json({success : false, msg : "Failed to Add part."+err});
        }else{
            res.json({success : true, msg : "Part Added."});
        }
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt',{session : false}),  function (req, res,next) {
    var id = req.params.id;
    var update = { 
        name : req.body.name,
        description : req.body.description,
        isSerial: req.body.isSerial,
        qrCode : req.body.qrCode,
        availableQuantity:req.body.availableQuantity
    };
    update.qrCode = "{ partName :" + update.name + "}"
    Part.updatePart(id, update, (err, reason) => {
         if (err) {
            res.json({ msg: 'Failed while updating part', status: 'error' });
        } else {
            res.json({ msg: 'new part updated successfully' });
        }
    });
});

//Delete
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),  (req, res, next) => {
    Part.deletePart(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting part', status: 'error',success:false });
        } else {
            res.json({ msg: 'part deleted successfully' });
        }
    })
});

module.exports = router;