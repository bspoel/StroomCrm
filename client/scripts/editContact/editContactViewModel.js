define(["jquery", "knockout", "text!editContact/editContact.html"], function($, ko, editContact) {

    class editContactViewModel {
        constructor(params) {
            this.app = params.app;
        	this.firstName = ko.observable();
            this.lastName = ko.observable();
            this.address = ko.observable();

            var self = this;
            this.fullName = ko.computed(function() {
                return self.firstName + " " + self.lastName;
            })
        }

        addContact() {
            this.app().create('contact', {name: this.fullName(), address: this.address()});
        }

        editContact() {
            console.log('edit Contact');
        }
    }

    return {viewModel: editContactViewModel, template: editContact};

});