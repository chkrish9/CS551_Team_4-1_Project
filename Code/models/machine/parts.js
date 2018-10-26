const mongoose = require('mongoose');

//Machine Group schema
const partsModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const parts = module.exports = mongoose.model('partsModel',partsModel);

module.exports.getpartsById = function (id, callback) {
parts.findById(id, callback);
}

module.exports.addparts = function (newparts, callback) {
    
    newparts.save(callback);
}

module.exports.updateparts = function (id, updateQuery, callback) {
    parts.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteparts = function (id, callback) {
    parts.remove({ _id: id }, callback);
}

module.exports.getparts = function (callback) {
    parts.find().exec(callback);
}
const Machine = module.exports = mongoose.model('MachineModel', MachineModel);

module.exports.getMachineById = function (id, callback) {
    Machine.findById(id, callback);
}

module.exports.addMachine = function (newMachine, callback) {
    //console.log(newMachine);
    newMachine.save(callback);
}

module.exports.updateMachine = function (id, updateQuery, callback) {
    Machine.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteMachine = function (id, callback) {
    Machine.remove({ _id: id }, callback);
}