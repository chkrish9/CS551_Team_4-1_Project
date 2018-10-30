var users = require('../modules/users/userrouter');
var login = require('../modules/users/loginrouter');
var usergroups = require('../modules/users/usergrouprouter');
var lines = require('../modules/machine/linerouter');
var reasons = require('../modules/machine/reasonrouter');
var importrouter = require('../modules/settings/importrouter');
var machinegroups = require('../modules/machine/machinegrouprouter');
var areas = require('../modules/machine/arearouter');
var machines = require('../modules/machine/machinerouter');
var settings = require('../modules/settings/settingsrouter');
var part = require('../modules/machine/partrouter');
var document = require('../modules/machine/documentrouter');
var template = require('../modules/machine/templaterouter');

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
    app.use('/settings',settings);
    app.use('/part',part);
    app.use('/document',document);
    app.use('/template',template);
};