define(["knockout", "text!menu/menu.html"], function(ko, menuTemplate) {

	class Menu {
		constructor() {
			this.location = ko.observable("home");
		}

		goToTasks() {
			this.location("task-list");
		}

		goToHome() {
			this.location("home");
		}
	};

	return {viewModel: Menu, template: menuTemplate};
});