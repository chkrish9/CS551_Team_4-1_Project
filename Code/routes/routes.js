var users = require('../modules/users/userrouter');
var usergroups = require('../modules/users/usergrouprouter');

module.exports = function router(app){
    app.use('/users',users);
    app.use('/usergroup',usergroups);
};