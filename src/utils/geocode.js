const request = require ('request')
// const map = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaXJlbmVrYXl1YyIsImEiOiJjazZ0anhjNHAwc2RyM2VtdTVjM2tveHVpIn0.6ucCBCciBsuKj5eZdPaxHQ&limit=1"

// request({url: map, json:true}, (error, response)=> {
//     if (error) {
//         console.log('There is no connection. Please check your network and try again!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find the location! Please try another search')
//     } else {
//     const data = response.body.features[0]
//     const latitute = data.center[1]
//     const longitute = data.center[0]
    
//     console.log(data.text + ' has a longitute of '+ longitute + ' and a latititue of '+ latitute +'.')
// }
// })

//callback funciton is to delay the execution of the function, it will only call when we finish the getting the address
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaXJlbmVrYXl1YyIsImEiOiJjazZ0anhjNHAwc2RyM2VtdTVjM2tveHVpIn0.6ucCBCciBsuKj5eZdPaxHQ&limit=1'
    request({url: url, json:true}, (error, response)=>{
        if (error) {
           callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Please try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
 })
}

module.exports = geocode
