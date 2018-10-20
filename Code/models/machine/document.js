const mongoose = require('mongoose');

//Document schema
const DocumentModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Document = module.exports = mongoose.model('DocumentModel', LineModel);

module.exports.getDocumentById = function (id, callback) {
    Document.findById(id, callback);
}

module.exports.addDocument = function (newDocument, callback) {
    newDocument.save(callback);
}

module.exports.updateLine = function (id, updateQuery, callback) {
    Line.findByIdAndUpdate(id, { $set: updateQuery }, callback);
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