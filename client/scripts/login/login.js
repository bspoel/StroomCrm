define(["jquery", "knockout", "text!login/login.html"], function($, ko, login) {

	class loginViewModel {

		constructor() {
			this.username = ko.observable();
			this.password = ko.observable();
			this.message = ko.observable();
			this.loggedIn = ko.observable();
		}

		login() {
			var self = this;
			self.message('');
			if (!self.username()) {
				this.message('Please enter username');
				return;
			}
			if (!self.password()) {
				this.message('Please enter password');
				return;
			}
			$.ajax("/login", {
                data: JSON.stringify({ username: self.username(), password: self.password() }),
                type: "post",
                contentType: "application/json",
                statusCode: {
                	401: function() { self.message('Username or password incorrect'); }
                },
        	    success: function(result) { self.loggedIn(true)},
        	    error: function(result) {  self.message('An error occurred') }
            });
		}

		logout() {
			var self = this;
			$.ajax("/logout", {
				success: function(result) {	self.loggedIn(false); },
				error: function(result) {  self.message('An error occurred') }
			});
		}
	}


	return {viewModel: loginViewModel, template: login}

});