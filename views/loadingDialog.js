App.Views.LoadingDialog = Backbone.View.extend({

    templateId: '#loading-dialog-template',

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);

        this.listenTo(Backbone.Events, '_loadmask:show', this.show);
        this.listenTo(Backbone.Events, '_loadmask:hide', this.hide);
    },

    render: function() {

        this.el.innerHTML = this.template({});

        return this;

    },

    show: function() {
        this.$el.show();
        return this;
    },

    hide: function() {
        this.$el.hide();
        return this;
    }

});
