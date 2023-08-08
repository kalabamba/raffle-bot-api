module.exports = {
    get:{
        tags: ['Raffles CRUD operations'],
        description: "Get raffles",
        operationId: 'getRaffles',
        parameters:[
            {
                name:"isActive",
                in:"query",
                required:false,
                description: "isActive query",
				schema:{
					type:"string"
				}
            },
            {
                name:"raffleMsgId",
                in:"query",
                required:false,
                description: "raffleMsgId query",
				schema:{
					type:"string"
				}
            }
        ],
        responses:{
            '200':{
                description:"Raffles were obtained",
                content:{
                    'application/json':{
                    }
                }
            },
            '401':{
				description: 'Unauthorized',
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                "error": "auth error message"
                            }
                        }
                    }
                }
			},
			'403':{
				description: 'Forbidden',
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                "error": "forbidden error message"
                            }
                        }
                    }
                }
			},
        },
        security: [
            {
                Bearer: [
                    "write:raffles",
                    "read:raffles"
                ]
            }
        ]
    }
}