const mongoose = require('mongoose');

//Part schema
const PartModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isSerial:{
        type: String
    },
    availableQuantity:{
        type: Number
    },
    qrCode: {
        type: String
    }
});

const Part = module.exports = mongoose.model('PartModel', PartModel);

module.exports.getPartById = function (id, callback) {
    Part.findById(id, callback);
}

module.exports.addPart = function (newPart, callback) {
    //console.log(newPart);
    newPart.save(callback);
}

module.exports.updatePart = function (id, updateQuery, callback) {
    Part.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deletePart = function (id, callback) {
    Part.remove({ _id: id }, callback);
}

module.exports.getParts = function (callback) {
    Part.find().exec(callback);
}

module.exports.getPartNames = function(name,callback){
    Part.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}
//Step group schema
const StepgroupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    steps : [{
        type: Schema.Types.ObjectId,
        ref: 'StepModel'
    }],
});
const MachineGroup = module.exports = mongoose.model('MachineGroupModel', MachineGroupModel);

module.exports.getMachineGroupById = function (id, callback) {
    MachineGroup.findById(id, callback);
}

module.exports.getMachineGroupByName = function (name, callback) {
    MachineGroup.find({name:name},callback);
}

module.exports.addMachineGroup = function (newMachineGroup, callback) {
    //console.log(newMachineGroup);
    newMachineGroup.save(callback);
}

module.exports.updateMachineGroup = function (id, updateQuery, callback) {
    MachineGroup.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteMachineGroup = function (id, callback) {
    MachineGroup.remove({ _id: id }, callback);
}

module.exports.getMachineGroups = function (callback) {
    MachineGroup.find().exec(callback);
}


module.exports.getLineById = function (id, callback) {
    Line.findById(id, callback);
}

module.exports.getLineByName = function (name, callback) {
    Line.find({name:name},callback);
}


module.exports.updateLine = function (id, updateQuery, callback) {
    Line.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}
module.exports.addLine = function (newLine, callback) {
    //console.log(newLine);
    newLine.save(callback);
}

module.exports.deleteLine = function (id, callback) {
    Line.remove({ _id: id }, callback);
}

module.exports.getLines = function (callback) {
    Line.find().exec(callback);
}

module.exports.getLineNames = function(name,callback){
    //console.log(name);
    Line.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}