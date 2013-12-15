define(function (require) {
	var $ = require('jquery'); 
	var _ = require('underscore'); 
	var Backbone = require('backbone'); 
    var Mustache = require('libs/mustache/mustache');

    var eventBus = require('component/events');
    var Path = require('component/path');
    var LegacyKiller = require('component/legacykiller');
	var Settings = require('component/settings');

    var HistoryView = require('views/historyView');
    var PromotionView = require('views/promotionView');
    var GameView = require('views/gameView');
    var TurnView = require('views/turnView');
    var AIView = require('views/aiView');

    var Game = require('models/game');
    var Board = require('component/boardWrapper');
	var Setup = require('models/setup');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Knight = require('models/knight');
    var Bishop = require('models/bishop');
    
    var computerMode = true;

    return function() {

    	LegacyKiller();
		new HistoryView({ el: $('.history') });
		new PromotionView({ el: $('.promotion'), gameArea: $('table') });
		new AIView({ el: $('.computer'), settings: Settings });
	    Board.init(Setup.DEFAULT);

		var game = new Game({ board: Board });
		var gameView = new GameView({ el: $('table'), model: game })
		new TurnView({ el : $('.turn'), model: game });
	    gameView.render();
    };
});
