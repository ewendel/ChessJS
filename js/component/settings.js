define(function (require) {

	var Settings = {
		computerMode: true,
		toggleAI: function() {
			if (Settings.computerMode) {
				Settings.computerMode = false;
			} else {
				Settings.computerMode = true;
			}
		}

	};


	return Settings;

});