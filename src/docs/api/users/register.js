
module.exports = {
    post:{
        tags:['User Register And Login operations'],
        description: "Register a user",
        operationId: "registerUser",
        parameters:[
		],
        requestBody: {
            content:{
                'application/json': {
					schema:{
						type:"object",
						properties:{
							email: { type: "string", example: "123@abc.com" },
							password: { type: "string", example: "12345678" }
                		}
            		}
        		}
			}
		},
        responses:{
            '200':{
                description: "User successfully logged in",
				content:{
                    'application/json':{
						schema:{
                            example:{
								"_id": "64c99dce186f0fa172d45c84",
								"email": "123@abc.com",
								"createdAt": "2023-09-28T20:29:53.283Z",
								"updatedAt": "2023-09-28T20:29:53.283Z",
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
        }
    }
}