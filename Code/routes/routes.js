var users = require('../modules/users/userrouter');
var machines = require('../modules/machine/machinerouter');

module.exports = function router(app){
    app.use('/users',users);
    app.use('/machine',machines);
};