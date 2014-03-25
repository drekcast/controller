App.Views.ScreenSwitcher = Backbone.View.extend({

    templateId: '#screen-switcher-template',

    buttonSelector: 'button.btn',
    defaultClass: 'btn btn-default',
    activeClass: 'btn btn-success',
    loadingClass: 'btn btn-primary',

    events: {
        "click .btn": "onButtonClick"
    },

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);

        this.listenTo(Backbone.Events, 'channel:screen', this.onClientChannelChanged);
    },

    render: function() {

        var screens = {};
        if (this.channel) {
            _.each(this.channel.screens, function(name) {
                screens[name] = { name: name };
            })
        }
        this.el.innerHTML = this.template({
            screens: screens
        });

        if (this.channel) {
            this.setButtonActive(this.channel.activeScreen);
        }

        return this;

    },

    setButtonActive: function(name) {
        this.$el.find(this.buttonSelector).attr('class', this.defaultClass);
        this.$el.find(this.buttonSelector+'[data-screen='+name+']').attr('class', this.activeClass);
    },

    setButtonLoading: function(name) {
        this.$el.find(this.buttonSelector+'[data-screen='+name+']').attr('class', this.loadingClass);
    },

    onButtonClick: function(e) {
        var target = e.target,
            $btn = $(target),
            screenName = $btn.data('screen');
        this.loadScreen(screenName);
    },

    loadScreen: function(screenName) {
        this.setButtonLoading(screenName);
        drekCastController.setScreen(screenName);
    },

    setChannel: function(channel) {
        this.channel = channel;
        this.render();
    },

    onClientChannelChanged: function(data) {
        this.setButtonActive(data.screen);
    }

});
