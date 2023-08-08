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
            },
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
                description:"Raffle is obtained",
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