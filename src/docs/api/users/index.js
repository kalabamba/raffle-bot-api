const login = require('./login');
const register = require('./register');

module.exports = {
    '/api/users/register':{
        ...register
    },
    '/api/users/login':{
        ...login
    }
}