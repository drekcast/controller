App.Views.ScreenSwitcher = Backbone.View.extend({

    templateId: '#screen-switcher-template',

    initialize: function() {
        var source = $(this.templateId).html();
        this.template = Handlebars.compile(source);
    },

    render: function() {

        this.el.innerHTML = this.template({
            screens: [
                { name: 'aa'},
                { name: 'bb'}
            ]
        });

        return this;

    }

});
