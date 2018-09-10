var users = require('../modules/users/userrouter');

module.exports = function router(app){
    app.use('/users',users);
};