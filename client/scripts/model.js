// This is an automatically generated file
define(["knockout"], function(ko) {
	var model = {}
	model.User = function(args) {
		this.name = ko.observable(args.name);
		this.password = ko.observable(args.password);
		this.id = args.id;
		this.updated_at = args.updated_at;
	};
	
	model.Task = function(args) {
		this.title = ko.observable(args.title);
		this.description = ko.observable(args.description);
		this.user_id = ko.observable(args.user_id);
		this.id = args.id;
		this.updated_at = args.updated_at;
	};
	
	model.Contact = function(args) {
		this.name = ko.observable(args.name);
		this.address = ko.observable(args.address);
		this.email = ko.observable(args.email);
		this.data = ko.observable(args.data);
		this.id = args.id;
		this.updated_at = args.updated_at;
	};
	
	model.Project = function(args) {
		this.name = ko.observable(args.name);
		this.description = ko.observable(args.description);
		this.id = args.id;
		this.updated_at = args.updated_at;
	};
	
	model.Membership = function(args) {
		this.project_id = ko.observable(args.project_id);
		this.contact_id = ko.observable(args.contact_id);
		this.id = args.id;
		this.updated_at = args.updated_at;
	};
	
	return model;
})
