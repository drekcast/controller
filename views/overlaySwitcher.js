App.Views.OverlaySwitcher = Backbone.View.extend({

    templateId: '#overlay-switcher-template',

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

        this.listenTo(Backbone.Events, 'channel:overlay', this.onClientOverlayChanged);
    },

    render: function() {

        this.el.innerHTML = this.template({
            overlays: this.channel ? this.channel.overlays : {}
        });

        return this;

    },

    setButtonActive: function(name, isVisible) {
        this.$el.find(this.buttonSelector+'[data-overlay='+name+']').attr('class', isVisible ? this.activeClass : this.defaultClass);
    },

    setButtonLoading: function(name) {
        this.$el.find(this.buttonSelector+'[data-overlay='+name+']').attr('class', this.loadingClass);
    },

    onButtonClick: function(e) {
        var target = e.target,
            $btn = $(target),
            overlayName = $btn.data('overlay'),
            oldState = $btn.hasClass('btn-success'),
            newState = !oldState;
        this.toggleOverlay(overlayName, newState);
    },

    toggleOverlay: function(overlayName, visible) {
        this.setButtonLoading(overlayName);
        drekCastController.toggleOverlay(overlayName, visible);
    },

    setChannel: function(channel) {
        this.channel = channel;
        this.render();
    },

    onClientOverlayChanged: function(data) {
        this.setButtonActive(data.overlay, data.visible);
    }

});
