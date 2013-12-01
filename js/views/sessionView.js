define(function(require) {

    var View = require('base/view');
    var SessionTemplate = require('text!templates/matchday.mustache');
    var Mustache = require('libs/mustache/mustache');
    var events = require('events');


    var SessionView = View.extend({

        template: Mustache.compile(SessionTemplate),

        events: {
            'click': 'clickHandler'
        },

        initialize: function(options) {
        },

        clickHandler: function(e) {
            events.trigger('expandSession', this.model);
            this.$el.addClass('open');
        },

        render: function() {
            this.model.set('attendance', this.model.get('attendance') || 0);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }


    });

    return SessionView;

});
