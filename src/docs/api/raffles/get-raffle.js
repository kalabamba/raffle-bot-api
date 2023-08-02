module.exports = {
    get:{
        tags:['Raffles CRUD operations'],
        description: "Get a raffle",
        operationId: "getRaffle",
        parameters:[
            {
                name:"id",
                in:"path",
                required:true,
                description: "A single raffle id",
				schema:{
					type:"string"
				}
            }
        ],
        responses:{
            '200':{
                description:"Raffle is obtained",
                content:{
                    'application/json':{
                    }
                }
            },
            '404':{
                description: "Raffle is not found",
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                error:"The raffle with the given ID was not found."
                            }
                        }
                    }
                }
            }
        }
    }
}