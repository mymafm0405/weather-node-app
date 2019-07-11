const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/995393353059174eaaebb38149a4bf46/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect with the weather services', undefined)
        } else if (body.error) {
            callback('Unable to find your location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + chalk.green.inverse('It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipIntensity + '% chance of rain.'))
        }
    })
    
}

module.exports = forecast