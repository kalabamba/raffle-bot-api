module.exports = {
    put:{
        tags:['Raffles CRUD operations'],
        description: "Update a raffle",
        operationId: "updateRaffle",
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
		requestBody: {
            content:{
                'application/json': {
					schema:{
						type:"object",
						properties:{
							_id: { type: "string", example: "64c99dce186f0fa172d45c84" },
							raffleGuildId: { type: "string", example: "1234567890" },
							raffleChannelId: { type: "string", example: "1234567890" },
							raffleMsgId: { type: "string", example: "1234567890" },
							raffleDetails: { type: "object", example: { prize: "250rp", description: "This is a raffle", creatorId: "raffle creator discord id" } },
							createdDate: { type: "string", example: "2023-09-28T20:29:53.283Z" },
							endDate: { type: "string", example: "2023-09-28T20:29:53.283Z" },
							isActive: { type: "boolean", example: true },
							winnerCount: { type: "number", example: 1 },
							winners: { type: "array", example: ["winner1", "winner2"] },
							backups: { type: "array", example: ["backup1", "backup2"] },
							"__v": { type: "number", example: 0 }
                		}
            		}
        		}
			}
		},
        responses:{
            '200':{
                description:"Raffle is updated",
                content:{
                    'application/json':{
						schema:{
							type:"object",
							example:{
								"raffleDetails": {
									"description": "This is a raffle",
									"prize": "250rp",
									"creatorId": "raffle creator discord id"
								},
								"_id": "64c99dce186f0fa172d45c84",
								"raffleGuildId": "1234567890",
								"raffleChannelId": "1234567890",
								"raffleMsgId": "1234567890",
								"createdDate": "2023-09-28T20:29:53.283Z",
								"endDate": "2023-09-28T20:29:53.283Z",
								"isActive": true,
								"winnerCount": 1,
								"winners": [
									"winner12",
									"winner2"
								],
								"backups": [
									"backup1",
									"backup2"
								],
								"__v": 4
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