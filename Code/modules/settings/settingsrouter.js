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


