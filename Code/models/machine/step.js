const mongoose = require('mongoose');

//Step schema
const StepModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Step = module.exports = mongoose.model('StepModel', StepModel);

module.exports.getStepById = function (id, callback) {
    Step.findById(id, callback);
}

module.exports.addStep = function (newStep, callback) {
    //console.log(newReason);
    newStep.save(callback);
}

module.exports.updateStep = function (id, updateQuery, callback) {
    Step.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteStep = function (id, callback) {
    Step.remove({ _id: id }, callback);
}

module.exports.getSteps = function (callback) {
    Step.find().exec(callback);
}
