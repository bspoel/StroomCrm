// This is an automatically generated file
define([], function() {
	var model = {}
	model.User = function(args) {
		this.name = args.name;
		this.password = args.password;
	};
	
	model.Task = function(args) {
		this.title = args.title;
		this.description = args.description;
		this.user_id = args.user_id;
	};
	
	model.Contact = function(args) {
		this.name = args.name;
		this.address = args.address;
		this.email = args.email;
		this.data = args.data;
	};
	
	model.Project = function(args) {
		this.name = args.name;
		this.description = args.description;
	};
	
	model.Membership = function(args) {
		this.project_id = args.project_id;
		this.contact_id = args.contact_id;
	};
	
	return model;
})
