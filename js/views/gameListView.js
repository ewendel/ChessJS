define(function (require) {

	var View = require('base/view');
    var Mustache = require('libs/mustache/mustache');
	var Utils = require('component/utils');
	var Game = require('models/game'); 
    var GameView = require('views/gameView');
    var Template = require('text!templates/gameListView.mustache');

	var GameListView = View.extend({
		el: $('#gamesfeed'),
		template: Mustache.compile(Template),

		initialize: function(options) {
			var defaults = {
				groupBySession: true
			};
			this.options = _.extend({}, defaults, options);
			this.title = this.options.title || 'Siste kamper';
		},
		render: function(games) {
			if (!games) {
				console.log('No games passed to GameListView');
			}
			this.$el.empty();
			this.renderTemplate(this);

			var view = this;
			_.each(games, function(game) {
				view.renderGame(game);
			});

		},
		renderGame: function(gameData) {
			var game = new Game(gameData);
			var gameView = new GameView({ model: game });
			this.$('.matches').append(gameView.render().el);
		}
	});


	return GameListView;
});	