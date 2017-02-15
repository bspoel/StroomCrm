define(["knockout", "text!menu/menu.html"], function(ko, menuTemplate) {

	class Menu {
		constructor() {
			this.location = ko.observable("home");
		}

		goToHome() {
			$('#main-menu ul li').removeClass("active");
			$("ul li:eq(0)").addClass("active");
			this.location("home");
		}

		goToTasks() {
			$('#main-menu ul li').removeClass("active");
			$("ul li:eq(1)").addClass("active");
			this.location("task-list");
		}

		
	};

	return {viewModel: Menu, template: menuTemplate};
});