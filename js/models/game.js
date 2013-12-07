define(function (require) {

	var Model = require('base/model');
	var Settings = require('component/settings');
    var Path = require('component/path');

	var Game = Model.extend({
		defaults: {
			turn: 1
		},
		initialize: function(options) {
			this.board = options.board;
		},
		performCPUMove: function(player) {
	    	try {
				if (!player) throw 'performCPUMove needs playerId';
		    	var moves = this.board.generateMoves(player);
		    	var move = moves[Math.floor(Math.random()*moves.length)];
		    	var position = Path.convert(move.position);
		    	this.performMove(move.piece, position);
	    	} catch (e) {
	    		debugger;
	    	}
		},
		performMove: function(piece, position) {
			var oldPos = Path.convert(piece.get('col'), piece.get('row'));
			var newPos = Path.convert(position.col, position.row);
			piece.move(position.col, position.row);
			this.changeTurn();
		},
		changeTurn: function() {
			if (this.get('turn') === 1) {
				this.set('turn', 2);
				if (Settings.computerMode) {
					this.performCPUMove(2);
				}
			} else {
				this.set('turn', 1);
			}
		},
		hasTurn: function(piece) {
			return piece.get('player') == this.get('turn');	
		},
		isCheck: function(player) {
			if (!player) throw "Checktester needs a player"
			var moves = this.board.generateMoves(player % 2 + 1)
			var pieces = this.board.getPiecesForPlayer(player);
			var king = _.filter(pieces, function(piece) { return piece.get('name') === 'king'; })[0];
			var kingsPath = king.path();
			var isCheck = false;
			_.each(moves, function(move) {
				if (move.position === kingsPath) {
					isCheck = true;
				}
			});
			return isCheck;	
		}
	});


	return Game;
});