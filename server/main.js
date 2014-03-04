'use strict';

var compress = require('koa-compress'),
	logger = require('koa-logger'),
	serve = require('koa-static'),
	router = require('koa-router'),
	koa = require('koa'),
	path = require('path'),
	app = module.exports = koa(),
	mongoose = require('mongoose'),
	staticPath = path.resolve(__dirname, '..', './public'),
	User = require('./models/User.js'),
	Q = require('q');

app.use(logger());
app.use(router(app));
app.use(compress());
app.use(serve(staticPath));

function setupMongo() {
	var firstUser = new User({
		firstname: 'First',
		lastname: 'User',
	});
	var secondUser = new User({
		firstname: 'Second',
		lastname: 'User',
	});

	mongoose.connect('mongodb://localhost/test');
	Q.async(function * () {
		yield Q.ninvoke(firstUser, 'save');
		yield Q.ninvoke(secondUser, 'save');
	})().done();
}

setupMongo();

app.get('/users', function * () {
	var result = yield Q.npost(User, 'find');
	this.body = { users: result };
});

if (!module.parent) {
	app.listen(3000);
	console.log('listening on port 3000');
}
