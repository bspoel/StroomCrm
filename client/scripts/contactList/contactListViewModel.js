define(["jquery", "knockout", "util", "text!contactList/contactList.html"], function($, ko, util, contactlist) {

    class contactListViewModel {
        constructor(params) {
            this.startIndex = ko.observable(0);
            this.numberOfItems = ko.observable(10);

        	this.contacts = ko.observableArray([]);
            this.loadContactList();
        }

        loadContactList() {
            var self = this;
            util.list('Contact', {index:0, length: 10}, function(data) {
                self.contacts(data);
            })
            
        }

        newContact() {
            this.app().navigate('edit-contact');
        }

        editContact() {
            console.log('edit-contact', {id: 'hello'});
        }
    }

    return {viewModel: contactListViewModel, template: contactlist}

});