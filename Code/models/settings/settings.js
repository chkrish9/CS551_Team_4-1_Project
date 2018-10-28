const mongoose = require('mongoose');

//Setting schema
const SettingModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const Setting = module.exports = mongoose.model('SettingModel', SettingModel);

module.exports.getSettingById = function (id, callback) {
    Setting.findById(id, callback);
}

module.exports.getSettingById = function (id, callback) {
    Setting.findById(id, callback);
}










