const express = require("express");
const hbs = require("hbs");
const request = require('request');
const fs = require('fs');
const port - process.env.PORT || 8080;

var app = express();
var url = '';
var getPhoto = () => {
	return new Promise((resolve, reject) => {
		request({
			url: "https://jsonplaceholder.typicode.com/photos",
			json: true
		}, (error, response, body) => {
			url = body[1].url;
			}
	)})
};


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('fetchImage', () => {
	getPhoto();
	console.log(url);
	return url
});

app.use((request, response, next) => {
	var time = new Date().toString();
	console.log(`${time}: ${request.method} ${request.url}`);
	next();
});

// app.use((request, response, next) => {
// 	var time = new Date().toString();
// 	response.render(('maintenance.hbs'), {
// 		datetime: time
// 	})
// })

app.get('/', (request, response) => {
	response.render('index.hbs', {
		title: 'Home Page',
		link1: '/info',
		link2: '/image',
		title1: 'About me',
		title2: 'See an image'
	})
}); 

app.get('/info', (request,response) => {
	response.render('aboutme.hbs', {
		title: 'About Page',
		link1: '/',
		link2: '/image',
		title1: 'Home page',
		title2: 'See an image'
	});
})

app.get('/404', (request,response) => {
	response.send({
		error: 'Page not found'
	})
})

app.get('/image', (request,response) => {
	response.render('image.hbs', {
		title: 'Image Page',
		link1: '/',
		link2: '/info',
		title1: 'Home page',
		title2: 'About me'
	})
})

app.listen(port, () => {
	console.log('Server is up on port 8080');
})
