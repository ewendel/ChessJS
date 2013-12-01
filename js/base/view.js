define([
    'jquery',
    'backbone',
    'underscore'
],
    function($, Backbone, _) {

        var View = Backbone.View.extend({

            constructor: function() {

                Backbone.View.prototype.constructor.apply(this, arguments);
            },

            destroy: function() {
                // Unbind all events bound in the view, i.e. those bound
                // with `this.bindTo`
                this.unbindAll();

                // Unbind all events that are bound to the view, i.e.
                // those bound with `this.on`
                this.off();

                // Remove the view from the DOM
                this.remove();
            },

            renderTemplate: function() {
                var data = {};
                _.each(arguments, function(arg) {
                    _.extend(data, arg);
                });

                var html = this.parseTemplate(this.template, data);
                this.$el.html(html);
            },

            parseTemplate: function(template, data) {
                return template(data);
            }

        });

        return View;

    });
