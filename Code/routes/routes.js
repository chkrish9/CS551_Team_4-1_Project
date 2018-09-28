var users = require('../modules/users/userrouter');
var reasons = require('../modules/users/reasonsrouter');
var usergroups = require('../modules/users/usergrouprouter');
var login = require('../modules/users/loginrouter');
module.exports = function router(app){
    app.use('/users',users);
    app.use('/login',login);
    app.use('/usergroup',usergroups);
    app.use('/reasons',reasons);
};