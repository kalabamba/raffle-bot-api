module.exports = {
    get:{
        tags: ['Raffles CRUD operations'],
        description: "Get raffles",
        operationId: 'getRaffles',
        parameters:[],
        responses:{
            '200':{
                description:"Raffles were obtained",
                content:{
                    'application/json':{
                    }
                }
            }
        }
    }
}