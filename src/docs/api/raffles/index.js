const getRaffles = require('./get-raffles');
const getRaffle = require('./get-raffle');
const createRaffle = require('./create-raffle');


module.exports = {
    paths:{
        '/api/raffles':{
            ...getRaffles,
            ...createRaffle
        },
        '/api/raffles/{id}':{
            ...getRaffle
        }
    }
}