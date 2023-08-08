
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
			'400':{
				description: 'Bad request',
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                "error": "validation error message"
                            }
                        }
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
            '500':{
                description: 'Server error',
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                "error": "Server error message"
                            }
                        }
                    }
                }
            }
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