const request = require ('request')
// const url = "https://api.darksky.net/forecast/ed0ecb2d3784a7961ee999b8d4573a26/37.8267,-122.4233"

// //two arguments 1. option objects(url: / key) 2. function - a. error, b. response - refers to the data we got from the string
// //json:true will automoatically convert into json parse
// request({url: url, json: true}, (error, response)=>{
//     console.log(response.body.daily.data[0].summary)
//     console.log('It is currently '+ response.body.currently.temperature + ' degree out. There is ' + response.body.currently.precipProbability + '% of chance to rain.')
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longititude, callback) =>{
    const url = 'https://api.darksky.net/forecast/ed0ecb2d3784a7961ee999b8d4573a26/'+latitude + ',' + longititude
    request ({url:url, json:true}, (error, response)=>{
        if (error) {
            callback('Unable to connect to the server, please check and try again later!', undefined)
        } else if (response.body.error) {
            callback('The location is not defined, please check and try again later!', undefined)
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                rainChance: response.body.currently.precipProbability,
                timeZone: response.body.timezone

            })
        }
    })
}

module.exports = forecast