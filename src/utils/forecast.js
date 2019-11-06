const request = require('request')

forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/9aa3a88078ae8a349af47c1ffed02c44/${lat},${long}?units=si`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Not able to connect to server', undefined)
        } else if (body.error){
            callback('Not able to find location', undefined)
        } else {
            const stringVal = `The temperature is ${body.currently.temperature} degrees and chance of rain is ${body.currently.precipProbability}%.
            Daily High is - ${body.daily.data[0].temperatureHigh}, Daily Low is - ${body.daily.data[0].temperatureLow}`
            callback(undefined, stringVal)
        }
    })
}

module.exports = forecast