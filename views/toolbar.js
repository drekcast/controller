App.Views.Toolbar = Backbone.View.extend({

    templateId: '#toolbar-template',

    events: {
        "click #toolbar-disconnect": "onDisconnectClick"
    },

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);

        this.listenTo(Backbone.Events, 'client:connect', this.onConnect);
        this.listenTo(Backbone.Events, 'client:disconnect', this.onDisconnect);
    },

    render: function() {

        this.el.innerHTML = this.template();

        return this;

    },

    onConnect: function() {
        this.$el.find('button').removeClass('btn-disabled').attr('disabled', false);

        this.$el.find('li.disabled').removeClass('disabled');
    },

    onDisconnect: function() {
        this.$el.find('button').addClass('btn-disabled').attr('disabled', true);

        this.$el.find('li').addClass('disabled');
    },

    onDisconnectClick: function() {

        drekCastController.disconnect();

    }

});
