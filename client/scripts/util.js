define(["knockout", "model"], function(ko, model) {
	var util = {};
	util.model = model;
	util.loggedIn = ko.observable();

	util.create = function(type, data, success) {
		console.log('CREATE: ' + type + ': ' + JSON.stringify(data));
		$.ajax({
			type: 'POST',
			url: '/create',
			data: ko.toJSON({type: type, data: data}),
			success: success,
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.list = function(type, args, success) {
		console.log('LIST: ' + type);
		$.ajax({
			type: 'POST',
			url: '/list',
			data: JSON.stringify({type: type, args: args}),
			success: success,
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.count = function(type, args, success) {
		console.log('COUNT: ' + type);
		var next = success;
		$.ajax({
			type: 'POST',
			url: '/count',
			data: JSON.stringify({type: type, args: args}),
			success: function(data) {
				next(data[0]['count(*)']);
			},
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.read = function(type, id, success) {
		console.log("GET:" + type + " " + id);
		$.ajax({
			type: 'POST',
			url: '/read',
			data: ko.toJSON({type: type, id: id}),
			success: success,
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.update = function(type, object, success) {
		console.log("UPDATE:", object);
		$.ajax({
			type: 'POST',
			url: '/update',
			data: ko.toJSON({type: type, object: object}),
			success: success,
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	util.delete = function(type, id, success) {
		$.ajax({
			type: 'POST',
			url: '/delete',
			data: ko.toJSON({type: type, id: id}),
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