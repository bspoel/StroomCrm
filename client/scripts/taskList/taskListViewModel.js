define(["jquery", "knockout", "text!taskList/taskList.html"], function($, ko, tasklist) {

	class Task {
		constructor(data) {
            this.title = ko.observable(data.title);
            this.isDone = ko.observable(data.isDone);
            this.id = data.id;
		}
	}

    class taskListViewModel {
        constructor(params) {
            console.log(params.details);
        	var self = this;
            $.getJSON("/task", function(allData) {
            	var mappedTasks = $.map(
            		allData, 
            		function(item) { return new Task(item) });
            	self.tasks(mappedTasks);
        	});

        	this.tasks = ko.observableArray([]);
	        this.newTaskText = ko.observable();
	        this.incompleteTasks = ko.computed(function() {
	            return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() });
	        });
        }

        // Operations
        addTask() {
            this.tasks.push(new Task({ title: this.newTaskText() }));
            this.newTaskText("");
        }

        removeTask(task) { 
        	this.tasks.destroy(task)
        }
        
        save() {
        	var self = this;
            $.ajax("/task", {
                data: ko.toJSON({ tasks: self.tasks }),
                type: "post",
                contentType: "application/json",
                success: function(result) { alert(result) }
            });
        }
    }

    return {viewModel: taskListViewModel, template: tasklist}

});