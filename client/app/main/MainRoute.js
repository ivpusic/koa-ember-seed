'use strict';

App.MainRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('user');
	}
});
