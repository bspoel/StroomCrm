define(["jquery", "knockout", "text!menu/menu.html", ], function($, ko, menuTemplate) {

	class Menu {
		constructor(params) {
			this.app = params.app;
		}

		setActiveTab(index) {
			$('#main-menu ul li').removeClass("active");
			$("ul li:eq("+index+")").addClass("active");
		}

		goToHome() {
			this.setActiveTab(0);
			$(window).trigger("stroomcrm:navigate", "home");
			//this.app().navigate("home");
		}

		goToTasks() {
			this.setActiveTab(1);
			$(window).trigger("stroomcrm:navigate", "task-list");
			
			//this.app().navigate("task-list", "asdqeqwe");
		}

		goToProjects() {
			this.setActiveTab(2);
			$(window).trigger("stroomcrm:navigate", "project-list");
			//this.app().navigate("project-list");
		}

		goToContacts() {
			this.setActiveTab(3);
			$(window).trigger("stroomcrm:navigate", "contact-list");
			//this.app().navigate("contact-list");
		}
	};

	return {viewModel: Menu, template: menuTemplate};
});