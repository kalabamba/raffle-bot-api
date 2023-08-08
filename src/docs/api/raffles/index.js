const getRaffles = require('./get-raffles');
const getRaffle = require('./get-raffle');
const createRaffle = require('./create-raffle');
const updateRaffle = require('./update-raffle');
const deleteRaffle = require('./delete-raffle');

module.exports = {
    '/api/raffles':{
        ...getRaffles,
        ...createRaffle
    },
    '/api/raffles/{id}':{
        ...getRaffle,
        ...updateRaffle,
        ...deleteRaffle
    }
}