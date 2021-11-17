const request = require("postman-request");

const stats = (country, callback) => {
    const options = {
        method: 'GET',
        url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total',
        qs: {country: country},
        json:true,
        headers: {
          'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
          'x-rapidapi-key': 'c67b0690c8msh58ef24dc83cfbe3p10cc69jsn2fbaa0cf5b74',
          useQueryString: true
        }
      };

    request(options, (err, {body}) => {
        if(err){
            callback(`Error: cant connect to a stats service!`)
        }else if(body.message === "Country not found. Returning global stats. Please use a country name found in the data property."){
            callback("Error: country not found!")
        }else{
            callback(undefined, body.data)
        }
    })
}


module.exports = stats;