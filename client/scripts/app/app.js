define(["jquery", "knockout", "util", "text!app/app.html"], function($, ko, util, appTemplate) {

	class App {
		constructor() {
			this.util = util;
			this.location = ko.observable("home");
			this.location_params = ko.observable();
			var self = this;

			$(window).on("stroomcrm:navigate", function(event, data) {
				if (typeof data === "string") {
					self.navigate(data);					
				} else {
					self.navigate(data.to, data.params);
				}
			});
		}

		navigate(to, params) {
			this.location_params(params)
			this.location(to);
		}


	}
	return {viewModel: App, template: appTemplate};
})