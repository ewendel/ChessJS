require.config({
    baseUrl: "/js/",
    waitSeconds: 100,
    paths: {
        jquery          :       'libs/jquery/jquery',
        jqueryui        :       'libs/jqueryui/jqueryui',
        underscore      :       'libs/underscore/underscore',
        backbone        :       'libs/backbone/backbone',
        mustache        :       'libs/mustache/mustache',
        events          :       'component/events'
    }
});


define(function(require) {

    var App = require('app');

	$(document).ready(function() {
        App();
	});
});