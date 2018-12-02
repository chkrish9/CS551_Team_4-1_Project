const express = require('express');
const router = express.Router();
const passport = require('passport');
const Maintenance = require('../../models/home/maintenance');
const schedule = require('node-schedule');

//Get
router.get('/machine/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    Maintenance.getRMaintenanceByMachineId(id,(err, data) => {
        if(err){
            res.json({success : false, msg : JSON.stringify(err)});
        }
        console.log(JSON.stringify(data));
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});


//Update
router.put('/update/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    //console.log( req.body);
    var id = req.params.id;
    console.log(id);
    console.log(maintenance);
    
    var rule = new schedule.RecurrenceRule();

    rule.minute = new schedule.Range(0, 59, 1);

    schedule.scheduleJob(rule, function(){
        console.log(rule);
        console.log('Today is recognized by Rebecca Black!---------------------------');
    });
    if (id === "0") {
        let newMaintenance = new Maintenance({
            machineName: req.body.machineName,
            schedule: req.body.schedule,
        });
        Maintenance.addMaintenance(newMaintenance, (err, data) => {
            if (err) {
                res.json({ success: false, msg: "Failed to Add maintenance." });
            } else {
                res.json({ success: true, msg: "maintenance Added." });
            }
        });
    } else {
        var maintenance = {
            machineName: req.body.machineName,
            schedule: req.body.schedule,
        };
        Maintenance.updateMaintenance(id, maintenance, (err, data) => {
            if (err) {
                res.json({ msg: 'Failed while updating maintenance', status: 'error' });
            } else {
                res.json({ msg: 'new maintenance added successfully' });
            }
        });
    }
});

module.exports = router;