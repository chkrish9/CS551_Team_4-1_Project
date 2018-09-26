var users = require('../modules/users/userrouter');
var login = require('../modules/users/loginrouter');
module.exports = function router(app){
    app.use('/users',users);
    app.use('/login',login);
};