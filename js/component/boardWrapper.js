define(function (require) {

	var Board = require('component/board');
    var eventBus = require('component/events');

    var board = new Board();
	
	eventBus.on('promotion', function(position) {
    	board.promotion = position;
    });

	board.findPromotionCandidate = function() {
		return board.promotion ? board.state[board.promotion.row][board.promotion.col] : undefined;
	};

	return board;

});