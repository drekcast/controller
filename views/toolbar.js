App.Views.Toolbar = Backbone.View.extend({

    templateId: '#toolbar-template',

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);
    },

    render: function() {

        this.el.innerHTML = this.template();

        return this;

    }

});
