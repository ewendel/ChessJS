define(function (require) {

	var View = require('base/view');
	var _ = require('underscore');

	var TurnView = View.extend({
		initialize: function() {
			this.model.on('change:turn', _.bind(this.render, this));
		},
		render: function(model) {
			var turn = model.get('turn');
			this.$el.removeClass('p1 p2').addClass(turn === 1 ? 'p1' : 'p2');
		}
	});


	return TurnView;
});