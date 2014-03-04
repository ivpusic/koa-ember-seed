'use strict';

var attr = DS.attr;

App.User = DS.Model.extend({
	firstname: attr('string'),
	lastname: attr('string')
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
	primaryKey: '_id'
});
