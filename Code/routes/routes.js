var users = require('../modules/users/userrouter');
//var machines = require('../modules/machine/machinerouter');
//var usergroups = require('../modules/users/usergrouprouter');
var login = require('../modules/users/loginrouter');

module.exports = function router(app){
    //app.use('/machine',machines);
    app.use('/users',users);
    app.use('/login',login);
    //app.use('/usergroup',usergroups);
};