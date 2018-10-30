const mongoose = require('mongoose');

//Step group schema
const StepgroupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Stepgroup = module.exports = mongoose.model('StepgroupModel', StepgroupModel);

module.exports.getStepgroupById = function (id, callback) {
    Stepgroup.findById(id, callback);
}

module.exports.addStepgroup = function (newStepgroup, callback) {
    //console.log(newReason);
    newStepgroup.save(callback);
}

module.exports.updateStepgroup = function (id, updateQuery, callback) {
    Stepgroup.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteStepgroup = function (id, callback) {
    Stepgroup.remove({ _id: id }, callback);
}

module.exports.getStepgroups = function (callback) {
    Stepgroup.find().exec(callback);
}
