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






