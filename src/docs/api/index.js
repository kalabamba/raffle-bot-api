const raffles = require('./raffles');
const users = require('./users');

module.exports = {
    paths: {
        ...raffles,
        ...users
    },
}