const request = require('request');

var getAddress = (address) => {
	encodedInput = encodeURIComponent(address)
	addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedInput}&key=AIzaSyDY7ZYa5qUgs5IYLtWG7MSK6rIvSYUVKVc`

	return new Promise((resolve, reject)=>{
		request({
	url: addressUrl,
	json: true
}, (error, response, body) => {
	if (error){
		reject('Cannot connect to Google Maps');
	} else if (body.status == 'ZERO_RESULTS'){
		reject('Cannot find requested address');
	} else if (body.status == 'OK'){
		resolve({
			latitude: body.results[0].geometry.location.lat,
			longitude: body.results[0].geometry.location.lng
	})}
})
	})}

var getForeCast = (lat, lng) => {
	currentDate = new Date();
	curUNIXTime = Math.round(currentDate.getTime()/1000);
	randomTime = genRandomNum(curUNIXTime - 1209600, curUNIXTime + 1209600);
	forecastURL = `https://api.darksky.net/forecast/e90ce0e915ebf043731e721f25874a7a/${lat},${lng},${randomTime}`

	return new Promise((resolve, reject) => {
		request({
			url: forecastURL,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Cannot connect to Dark Sky');
			} else if (body.code == 400){
				reject('Cannot find requested address or invalid time specified')
			} else {
				resolve({
					summary: body.hourly.summary
				})
			}
		}
	)})};

var genRandomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min) ) + min;
}

module.exports = {
	getAddress, getForeCast
}

//https://api.darksky.net/forecast/e90ce0e915ebf043731e721f25874a7a/[latitude],[longitude],[time]