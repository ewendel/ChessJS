define(function (require) {

	return function() {
		if ($.browser.msie && parseInt($.browser.version,10) < 9) {
    		$('body').empty();
    		alert('Du bruker en gammel nettleser som ikke støttes. Oppgrader til Google Chrome, Mozilla Firefox eller en annen moderne nettleser for å bruke denne siden');
    		return;
    	}
	};
});