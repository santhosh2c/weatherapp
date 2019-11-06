const request = require('request')

forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/9aa3a88078ae8a349af47c1ffed02c44/${lat},${long}`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Not able to connect to server', undefined)
        } else if (body.error){
            callback('Not able to find location', undefined)
        } else {
            callback(undefined, `The temperature is ${body.currently.temperature} and chance of rain is ${body.currently.precipProbability}%`)
        }
    })
}

module.exports = forecast