const express = require('express');
const router = express.Router();
const passport = require('passport');
const Maintenance = require('../../models/home/maintenance');
const Ticket = require('../../models/home/ticket');
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
    
   
    if (id === "0") {
        let newMaintenance = new Maintenance({
            machineName: req.body.machineName,
            schedule: req.body.schedule,
        });
        Maintenance.addMaintenance(newMaintenance, (err, data) => {
            if (err) {
                res.json({ success: false, msg: "Failed to Add maintenance." });
            } else {
                createSchedule(newMaintenance);
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
                createSchedule(maintenance);
                res.json({ msg: 'new maintenance added successfully' });
            }
        });
    }
});

function createSchedule(maintenance){
    var rule = new schedule.RecurrenceRule();
    var t=0;
    if(maintenance.schedule === "week"){
        t=1;
    }else if(maintenance.schedule === "month"){
        t=2;
    }else if(maintenance.schedule === "year"){
        t=3;
    }
    rule.minute = new schedule.Range(0, 59, t);

    schedule.scheduleJob(rule, function(){
        console.log(rule);
        console.log(JSON.stringify(maintenance));
        var newTicket = new Ticket({
            machineName:maintenance.machineName,
            reason: "5bae223052b0a00bdcb9aa68"
        });
        Ticket.addTicket(newTicket,(err, data) => {
            if (err) {
                console.log(JSON.stringify(err));
                //res.json({ success: false, msg: "Failed to Add maintenance." });
            } else {
                console.log(JSON.stringify(data));
                //res.json({ success: true, msg: "maintenance Added." });
            }
        });
    });
}
module.exports = router;