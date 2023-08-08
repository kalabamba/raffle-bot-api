module.exports = {
    delete:{
        tags:['Raffles CRUD operations'],
        description: "Delete a raffle",
        operationId: "deleteRaffle",
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
                description:"Raffle is deleted",
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
									"winner1",
									"winner2"
								],
								"backups": [
									"backup21",
									"backup2"
								],
								"__v": 3
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