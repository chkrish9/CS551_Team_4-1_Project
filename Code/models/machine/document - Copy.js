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
    },
    uploadFileName :{
        type:String
    },
    originalFileName :{
        type:String
    }
});


const Document = module.exports = mongoose.model('DocumentModel', DocumentModel);

module.exports.getDocumentById = function (id, callback) {
    Document.findById(id, callback);
}
const Document = module.exports = mongoose.model('DocumentModel', DocumentModel); 
sdc
module.exports.addDocument = function (newDocument, callback) {
    newDocument.save(callback);
}
msdbc
module.exports.updateDocument = function (id, updateQuery, callback) {
    Document.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

mo
        Document.find().exec(callback);
back) {
    Document.find().exec(callback);
}

module.exports.getDocumentNames = function(name,callback){
    //console.log(name);
    Document.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}
    Document.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
