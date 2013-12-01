define(function (require) {

    var View = require('base/view');
    var MatchTemplate = require('text!templates/match.mustache');
    var Mustache = require('libs/mustache/mustache');


    var GameView = View.extend({

        template: Mustache.compile(MatchTemplate),

        initialize: function(options) {

        },

        render: function() {
            this.el = this.template(this.model.attributes);
            return this;
        }


    });

    return GameView;

});
