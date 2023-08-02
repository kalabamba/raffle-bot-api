
module.exports = {
    post:{
        tags:['Raffles CRUD operations'],
        description: "Create a new raffle",
        operationId: "createRaffle",
        parameters:[
		],
        requestBody: {
            content:{
                'application/json': {
					schema:{
						type:"object",
						properties:{
							raffleGuildId: { type: "string", example: "1234567890" },
							raffleChannelId: { type: "string", example: "1234567890" },
							raffleMsgId: { type: "string", example: "1234567890" },
							raffleDetails: { type: "object", example: { prize: "250rp", description: "This is a raffle", creatorId: "raffle creator discord id" } },
							createdDate: { type: "string", example: "2023-09-28T20:29:53.283Z" },
							endDate: { type: "string", example: "2023-09-28T20:29:53.283Z" },
							winnerCount: { type: "number", example: 1 }
                		}
            		}
        		}
			}
		},
        responses:{
            '201':{
                description: "Raffle created successfully",
				content:{
                    'application/json':{
						schema:{
                            example:{
                                message:"We can't find the raffle"
                            }
                        }
                    }
                }
            },
			'400':{
				description: 'Bad request'
			},
            '500':{
                description: 'Server error'
            }
        }
    }
}