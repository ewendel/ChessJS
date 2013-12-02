define(function (require) {
	var _ = require('underscore'); 
    var eventBus = require('component/events');

    eventBus.on('promotion', function(position) {
    	promotion = position;
    });
    
	// initialized from outside
	var state = [];

	var promotion;

	function outOfBounds(col, row) {
		if (col < 0 || col > 7 || row < 0 || row > 7) return true;
		return false;
	}

	var Board = {
		init: function(board) {
			if (!board || !_.isArray(board) || board.length !== 8) {
				throw "Board was set up with illegal params"
			}
			state = board;
		},
		getPieceForPosition: function(col, row) {
			if (arguments.length === 0) throw "getPieceForPosition needs argument";
			if (outOfBounds(col, row)) return undefined;
			return state[row][col];
		},
		setPosition: function(col, row, piece) {
			if (outOfBounds(col, row)) return undefined;
			state[row][col] = piece;
		},
		positionIsEmpty: function(col, row) {
			if (outOfBounds(col, row)) return undefined;
			return state[row][col] === undefined;
		},
		getPiecesForPlayer: function(player) {
			var pieces = [];
			_.each(state, function(row) {
				_.each(row, function(piece) {
					if (piece && piece.id() === player) pieces.push(piece);
				});
			})
			return pieces;
		},
		generateMoves: function(player) {
			var moves = [];
			var pieces = Board.getPiecesForPlayer(2);
			_.each(pieces, function(piece) {
				var validMoves = piece.getValidMoves();
				_.each(validMoves, function(move) {
					moves.push({
						piece: piece,
						position: move
					});
				});
			});
			if (moves.length === 0) debugger;
			return moves;
		},
		findPromotionCandidate: function() {
			return promotion ? state[promotion.row][promotion.col] : undefined;
		}
	};


	return Board;

});