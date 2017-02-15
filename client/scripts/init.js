requirejs(["jquery", "knockout", "bootstrap", 
	"menu/menu", "tasklist/taskListViewModel", "home/home", "login/login"], 
	function($, ko, bootstrap, menu, taskListViewModel, home, login) {

	ko.components.register('task-list', taskListViewModel);
	ko.components.register('main-menu', menu);
	ko.components.register('home', home);
	ko.components.register('login', login);
	ko.applyBindings()
});