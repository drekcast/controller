App.Views.ChannelView = Backbone.View.extend({

    templateId: '#channel-view-template',

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);

        this.screenSwitcher = new App.Views.ScreenSwitcher();

        this.listenTo(Backbone.Events, 'channel:join', this.loadChannel);
    },

    render: function() {

        this.el.innerHTML = this.template({

            channel:        this.channel
        });

        this.$el.find('.screen-switcher-container').append(this.screenSwitcher.render().$el);

        return this;

    },

    loadChannel: function(channel) {

        this.channel = channel.channel;

        this.screenSwitcher.setChannel(this.channel);

        this.render();

        this.show();

        Backbone.Events.trigger('_loadmask:hide');
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
