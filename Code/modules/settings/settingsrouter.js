const express = require('express');
const router = express.Router();
const passport = require('passport');
const Settings = require('../../models/settings/settings')

//Get
router.get('/all',passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Settings.getSettings((err, data) => {
        res.json(data);
    });
});

//Update
router.put('/update/:id',passport.authenticate('jwt', { session: false }),  function (req, res, next) {
    console.log(req.body);
    var id = req.params.id;
    var update = {
        name: req.body.name,
        value: req.body.value
    };
    Settings.updateSetting(id, update, (err, machineGroup) => {
        if (err) {
            res.json({ msg: 'Failed to update', status: 'error' });
        } else {
            res.json({ msg: 'updated successfully' });
        }
    });
});

