var App = Backbone.View.extend({

    el: '#app',

    initialize: function(){

        var self = this;

        // Views
        this.toolbar = new App.Views.Toolbar();
        this.screenSwitcher = new App.Views.ScreenSwitcher();
        this.connectDialog = new App.Views.ConnectDialog();

        // Render
        this.render();

        // Start listening to the routing
        Backbone.history.start({pushState: false});
    },

    render: function() {

        this.$el.append(this.toolbar.render().el);
        this.$el.append(this.connectDialog.render().el);
        //this.$el.append(this.screenSwitcher.render().el);

    }
});
App.Views = {};

$(function() {
    window.drekCastController = new App();
})