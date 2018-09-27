var users = require('../modules/users/userrouter');
var users = require('../modules/users/linerouter');
var usergroups = require('../modules/users/usergrouprouter');
var login = require('../modules/users/loginrouter');
module.exports = function router(app){
    app.use('/users',users);
    app.use('/login',login);
    app.use('/usergroup',usergroups);
	app.use('/line',linerouter);
};