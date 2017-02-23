define(["jquery", "knockout", "util", "text!editContact/editContact.html"], function($, ko, util, editContact) {

    class editContactViewModel {
        constructor(params) {
            this.app = params.app;
            this.contact = ko.observable(new util.model.Contact({}));

            var self = this;
            util.read("Contact", params.details.id, function(contact){
                self.contact(new util.model.Contact(contact));
            });
        }

        execute() {
            util.update("Contact", this.contact(), function() {
                console.log('Geupdate!');
                $(window).trigger('stroomcrm:navigate', 'contact-list');
            });
        }
    }

    return {viewModel: editContactViewModel, template: editContact};

});