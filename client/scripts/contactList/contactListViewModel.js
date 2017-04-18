define(["jquery", "knockout", "util", "text!contactList/contactList.html"], function($, ko, util, contactlist) {

    var vm = function contactListViewModel() {
		var self = this;

        self.load = function() {
            util.list(
            	'Contact', 
            	{index:self.startIndex(), length: self.numberOfItemsShown()}, 
            	function(data) { self.contacts(data); }
            );
            util.count('Contact', {}, function(data) {
            	self.numberOfItemsAvailable(data);
            });
        };

        self.newContact = function() {
            $(window).trigger('stroomcrm:navigate', 'edit-contact');
        };

        self.editContact = function(contact) {
            $(window).trigger(
                'stroomcrm:navigate', 
                {to: 'edit-contact', params: {id: contact.id}}
            );
        };

        self.deleteContact = function(contact) {
            util.delete("Contact", contact.id, function() {
                console.log("item deleted");
                self.load();
            });
        };

        self.gotoFirstPage = function() {
        	console.log('first');
        };

        self.gotoPreviousPage = function() {
        	console.log('prev');
        };

        self.gotoNextPage = function() {
        	self.startIndex(self.startIndex() + self.numberOfItemsShown());
        	self.load();
			console.log('next');
        };

        self.gotoLastPage = function() {
			console.log('last');
        };


        self.startIndex = ko.observable(0);
        self.numberOfItemsShown = ko.observable(10);
        self.numberOfItemsAvailable = ko.observable();
    	self.contacts = ko.observableArray([]);
        self.load();

        return self;
    }

    return {viewModel: vm, template: contactlist}

});