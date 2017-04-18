define(["jquery", "knockout", "util", "text!editContact/editContact.html"], function($, ko, util, editContact) {

    class editContactViewModel {
        constructor(params) {
            this.app = params.app;
            this.contact = ko.observable(new util.model.Contact());

            var self = this;
            if (params.details && params.details.id) {
                util.read("Contact", params.details.id, function(contact){
                    self.contact(new util.model.Contact(contact));
                });
            } else {
                self.contact(new util.model.Contact());
            }
        }

        execute() {
            if (!this.contact().id) {
                util.create("Contact", this.contact(), function() {
                    console.log('Nieuw contact aangemaakt!')
                    $(window).trigger('stroomcrm:navigate', 'contact-list');
                });
            } else {
                util.update("Contact", this.contact(), function() {
                    console.log('Geupdate!');
                    $(window).trigger('stroomcrm:navigate', 'contact-list');
                });                
            }
        }
    }

    return {viewModel: editContactViewModel, template: editContact};

});