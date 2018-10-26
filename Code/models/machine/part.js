const mongoose = require('mongoose');

//Part schema
const PartModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    //console.log(name);
    Part.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}