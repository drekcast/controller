App.Views.ConnectDialog = Backbone.View.extend({

    templateId: '#connect-dialog-template',

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);
    },

    render: function() {

        this.el.innerHTML = this.template();

        return this;

    }

});
