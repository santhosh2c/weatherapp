const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FudGhvc2gyYyIsImEiOiJjazJqNzZoangwbWR3M2NvaDd1ampvNzQwIn0.CjLminPHI3CuTPI8RBe5jA&limit=1`

    request( {url, json: true}, (error, { body }) => {
        if(error) {
            callback('Not able to connect to server', undefined)
        } else if (body.features.length === 0){
            callback('Not able to find location. Try another', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode