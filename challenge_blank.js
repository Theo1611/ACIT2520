const express = require('express');
const request = require('request');
const gmaps = require("./geomap.js");

var app = express();
var weather = ''; //variable to hold the weather info

app.use(express.static(__dirname + '/public'));

// here add routes
app.get('/weather/:addr', (request,response) => {
	var input = request.params.addr;
	gmaps.getAddress(input).then((result) => {
	return gmaps.getForeCast(result.latitude, result.longitude)
}).then((result) => {
	response.send(result)
}
).catch((error) => {
	console.log(error);
})
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    // here add the logic to return the weather and save it inside the weather variable
});