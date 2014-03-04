'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String
});
var User = mongoose.model('User', userSchema);

module.exports = User;
