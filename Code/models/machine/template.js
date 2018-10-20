const mongoose = require('mongoose');

//Line schema
const TemplateModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Template = module.exports = mongoose.model('TemplateModel', TemplateModel);

module.exports.getTemplateById = function (id, callback) {
    Line.findById(id, callback);
}

module.exports.addTemplate = function (newTemplate, callback) {
    //console.log(newTemplate);
    newLine.save(callback);
}

module.exports.updateTemplate = function (id, updateQuery, callback) {
    Line.findByIdAndUpdate(id, { $set: updateQuery }, callback);
}

module.exports.deleteTemplate = function (id, callback) {
    Line.remove({ _id: id }, callback);
}

module.exports.getTemplate = function (callback) {
    Line.find().exec(callback);
}

module.exports.getTemplateNames = function(name,callback){
    //console.log(name);
    Template.find({ "name": { $regex: '.*' + name + '.*' }}, callback);
}