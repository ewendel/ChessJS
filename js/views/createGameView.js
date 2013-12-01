define(function (require) {

	var View = require('base/view');
    var Mustache = require('libs/mustache/mustache');
    // var Template = require('text!templates/createGame.mustache');

	var CreateGameView = View.extend({
		el: $(''),

		initialize: function() {

		},
		render: function() {
			this.renderTemplate();
		}
	});


	return CreateGameView;
});