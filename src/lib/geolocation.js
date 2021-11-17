const request = require("postman-request");

const geoLocation = (longitude, latitude, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoidXNlcm5hbWUxNjE2MzIiLCJhIjoiY2t2MHMyNWtjMDl4eTJ2b3ZqMXlyamVxaSJ9.HsT1QIUnByNTmf5Un_XR7g&limit=1%27`;
    request(url, {json:true}, (err, {body}) => {
        if(err){
            callback(`Error: couldn\`t connect to geoLocation services`)
        }else if(body.features.length === 0){
            callback(`Error: coludn\`t get geolocation`)
        }else{
            callback(undefined, body.features[0].context[2].text)
        }
    })
}

module.exports = geoLocation