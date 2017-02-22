define(["knockout", "model"], function(ko, model) {
	var util = {};
	util.model = model;
	util.loggedIn = ko.observable();

	util.create = function(type, data) {
		console.log('creating ' + type + ': ' + JSON.stringify(data));
		$.ajax({
			type: 'POST',
			url: '/create',
			data: JSON.stringify({type: type, data: data}),
			success: function(data) { alert('data: ' + data); },
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.list = function(type, args, success) {
		console.log('list!');
		$.ajax({
			type: 'POST',
			url: '/list',
			data: JSON.stringify({type: type, args: args}),
			success: success,
			contentType: 'application/json',
			dataType: 'json'
		});
	}


	/*
	var eventBus = {}
	util.on(eventName, callback) {
		if (!eventBus[eventName]) eventBus[eventName] = [];
		eventBus[eventName].push(callback);
	}

	util.emit(eventName, args) {

	}
	*/

	return util;
})