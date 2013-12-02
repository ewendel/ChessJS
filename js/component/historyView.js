define(function (require) {

	var View = require('base/view');
    var Mustache = require('libs/mustache/mustache');
    var eventBus = require('component/events');

	var HistoryView = View.extend({
		initialize: function() {
			eventBus.on('move', _.bind(this.renderMove, this));
		},
		renderMove: function(move) {
			var markup = '<div class="{0}">{1} from {2} to {3}</div>';
			var className = 'p' + move.piece.id();
			markup = markup.format(className, move.piece.get('name').capitalize(), move.oldPos, move.newPos);
			this.$el.prepend(markup);
		}
	});


	return HistoryView;
});