var users = require('../modules/users/userrouter');
var login = require('../modules/users/loginrouter');
var usergroups = require('../modules/users/usergrouprouter');
var lines = require('../modules/machine/linerouter');
var reasons = require('../modules/machine/reasonrouter');
var importrouter = require('../modules/settings/importrouter');
var machinegroups = require('../modules/machine/machinegrouprouter');
var areas = require('../modules/machine/arearouter');
var machines = require('../modules/machine/machinerouter');

module.exports = function router(app){
    app.use('/users',users);
    app.use('/usergroups',usergroups);
    app.use('/login',login);
    app.use('/line',lines);
    app.use('/reason',reasons);
    app.use('/machinegroup',machinegroups);
    app.use('/area',areas);
    app.use('/machine',machines);
    app.use('/import',importrouter);
};