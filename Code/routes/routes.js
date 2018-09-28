var users = require('../modules/users/userrouter');
var login = require('../modules/users/loginrouter');
var usergroups = require('../modules/users/usergrouprouter');

module.exports = function router(app){
    app.use('/users',users);
    app.use('/usergroups',usergroups);
    app.use('/login',login);
};