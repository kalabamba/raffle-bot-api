
module.exports = {
    openapi:"3.0.1",
    info:{
        version:"1.0.0",
        title:"Raffle Bot API",
        description: "Raffle Bot API for Discord bot",
        contact:{
            name:"Turgut Memiş",
            email:"info@turgutmemis.com",
            url:"https://www.turgutmemis.com"
        }
    },
    "servers": [
        {
          "url": "http://localhost:3000"
        },
        {
            "url": "https://raffle-bot.turgutmemis.com"
        }
    ],
    components: {
        securitySchemes: {
            Bearer: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
}