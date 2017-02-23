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
            $(window).trigger('stroomcrm:navigate', 'edit-contact');
        }

        editContact(contact) {
            $(window).trigger(
                'stroomcrm:navigate', 
                {to: 'edit-contact', params: {id: contact.id}}
            );
        }
    }

    return {viewModel: contactListViewModel, template: contactlist}

});