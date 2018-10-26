const mongoose = require('mongoose');

//Import schema
const ImportModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Import = require('../../models/settings/import');
const Settings = require('../../models/settings/import')









