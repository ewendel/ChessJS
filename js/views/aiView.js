define(function (require) {

	var View = require('base/view');
	var Settings = require('component/settings');

	var AIView = View.extend({
		events: {
			'click' : 'toggle'
		},
		initialize: function() {
			if (Settings.computerMode) this.$el.addClass('active');
			this.setText();
		},
		toggle: function() {
			Settings.toggleAI();
	    	this.$el.toggleClass('active');
	    	this.setText();
		},
		setText: function() {
			var text = Settings.computerMode ? 'Disable computer' : 'Enable computer';
	    	this.$el.text(text);
		}
	});


	return AIView;
});