define(function(require) {
	var ko = require("knockout");
	var app = require("app/app");
	var menu = require("menu/menu");
	var home = require("home/home");
	var login = require("login/login");
	var taskListViewModel = require("taskList/taskListViewModel");
	var projectListViewModel = require("projectList/projectListViewModel");
	var contactListViewModel = require("contactList/contactListViewModel");

	ko.components.register('app', app);	
	ko.components.register('app-menu', menu);
	ko.components.register('home', home);
	ko.components.register('login', login);
	ko.components.register('task-list', taskListViewModel);
	ko.components.register('project-list', projectListViewModel);
	ko.components.register('contact-list', contactListViewModel);
	ko.components.register('edit-contact', require("editContact/editContactViewModel"));

	ko.applyBindings()
});