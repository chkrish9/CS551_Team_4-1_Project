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

const Import = module.exports = mongoose.model('ImportModel', ImportModel);

module.exports.getImportById = function (id, callback) {
    Import.findById(id, callback);
}

module.exports.updateImport = function (id, updateQuery, callback) {
    Import.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteImport = function (id, callback) {
    Import.remove({ _id: id }, callback);
}

module.exports.getImports = function (callback) {
    Import.find().exec(callback);
}




