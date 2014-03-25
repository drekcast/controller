var App = Backbone.View.extend({

    el: '#app',

    initialize: function(){

        var self = this;

        // Views
        this.toolbar = new App.Views.Toolbar();
        this.connectDialog = new App.Views.ConnectDialog();
        this.loadingDialog = new App.Views.LoadingDialog();
        this.channelView = new App.Views.ChannelView();

        // Render
        this.render();

        // Start listening to the routing
        Backbone.history.start({pushState: false});

        this.tryReconnect();
    },

    render: function() {

        this.$el.append(this.toolbar.render().el);
        this.$el.append(this.connectDialog.render().el);
        this.$el.append(this.loadingDialog.render().hide().el);
        this.$el.append(this.channelView.render().hide().el);
        //this.$el.append(this.screenSwitcher.render().el);

    },

    tryReconnect: function() {
        var data = window.localStorage.getItem('drekcast-connect');
        if (data) {
            try {
                data = JSON.parse(data);
            } catch(e) {
                data = {};
            }
        }
        if (data) {
            Backbone.Events.trigger('_client:autoconnect');
            this.connect(data.address, data.port, data.username, data.password);
        }
    },

    connect: function(address, port, username, password) {

        Backbone.Events.trigger('_client:connecting');
        this.client = new DrekCastClient({
            serverAddress: 'http://'+address+':'+port,
            channel: 'drekcast-test'
        });
        this.client.on('all', function(message, data) {
            Backbone.Events.trigger(message, data);
        });
        this.client.connect();
    },

    disconnect: function() {
        this.client.disconnect();
    },

    setScreen: function(screenName) {
        this.client.setScreen(screenName);
    },

    toggleOverlay: function(overlayName, visible) {
        this.client.toggleOverlay(overlayName, visible);
    }


});
App.Views = {};

$(function() {
    window.drekCastController = new App();

    Backbone.Events.on('all', function() {
        console.log(arguments);
    });
})