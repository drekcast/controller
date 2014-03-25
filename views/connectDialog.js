App.Views.ConnectDialog = Backbone.View.extend({

    templateId: '#connect-dialog-template',

    events: {
        "click #connectDialogButton":          "connect"
    },

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);

        this.listenTo(Backbone.Events, '_client:connecting', this.hide);
    },

    render: function() {

        this.el.innerHTML = this.template({
            address: 'localhost',
            port: 3000,
            username: 'admin',
            password: 'test'
        });

        return this;

    },

    hide: function() {
        this.$el.hide();
    },

    connect: function(e) {
        e.preventDefault();

        var serverAddress = $('#connectDialogAddress').val(),
            serverPort = $('#connectDialogPort').val(),
            username = $('#connectDialogUsername').val(),
            password = $('#connectdialogPassword').val();

        Backbone.Events.trigger('_loadmask:show');
        drekCastController.connect(serverAddress, serverPort, username, password);
    }

});
