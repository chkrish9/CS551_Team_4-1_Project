const express = require('express');
const router = express.Router();
const passport = require('passport');
const Maintenance = require('../../models/home/maintenance');
const Reason = require('../../models/machine/reasons');
const Setting = require('../../models/settings/settings');
const Ticket = require('../../models/home/ticket');
const schedule = require('node-schedule');
var io="";

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
    
    io = req.app.get('io');
    
    if (id === "0") {
        let newMaintenance = new Maintenance({
            machineName: req.body.machineName,
            machineId:req.body.machineId,
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
            machineId:req.body.machineId,
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
        Setting.getSettingByName("Regular Maintenance Reason",(err, data)=>{
            console.log(data);
            Reason.getReasonByName(data[0].value,(err, data)=>{
                console.log(data);
                var newTicket = new Ticket({
                    machineName:maintenance.machineName,
                    reasonName: data[0].name,
                    machineId:maintenance.machineId,
                    reasonId:data[0]._id,
                });
                Ticket.addTicket(newTicket,(err, data) => {
                    if (err) {
                        console.log(JSON.stringify(err));
                        //res.json({ success: false, msg: "Failed to Add maintenance." });
                    } else {
                        io.emit('newTicketCreated');
                        console.log(JSON.stringify(data));
                        //res.json({ success: true, msg: "maintenance Added." });
                    }
                });
            })
        });
        
    });
}

//Create
router.post('/create',passport.authenticate('jwt',{session : false}), (req, res, next) =>{
    var newTicket = new Ticket({
        machineName:req.body.machineName,
        reasonName: req.body.reasonName,
        machineId:req.body.machineId,
        reasonId:req.body.reasonId,
    });
    io = req.app.get('io');
    Ticket.addTicket(newTicket,(err, data) => {
        if (err) {
            console.log(JSON.stringify(err));
            //res.json({ success: false, msg: "Failed to Add maintenance." });
        } else {
            io.emit('newTicketCreated');
            console.log(JSON.stringify(data));
            //res.json({ success: true, msg: "maintenance Added." });
        }
    });
});

//Get
router.get('/all',passport.authenticate('jwt',{session : false}), (req, res, next) => {
    Ticket.getTickets((err, data) => {
        res.json(data);
    });
    //res.send('Redirected to Contant list');
});
module.exports = router;