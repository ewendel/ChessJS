define(function (require) {
	var _ = require('underscore'); 
    var eventBus = require('component/events');
    var Path = require('component/path');

    eventBus.on('promotion', function(position) {
    	promotion = position;
    });

	var state = [];

	var promotion;

	function outOfBounds(col, row) {
		if (arguments.length === 1) {
			var position = arguments[0];
			col = position.col;
			row = position.row;
		}
		if (col < 0 || col > 7 || row < 0 || row > 7) return true;
		return false;
	}

	var Board = {
		// NEW API
		clear: function() {
			state = undefined;
			state = [];
			_.times(8, function() { state.push([]); _.times(8, function() { _.last(state).push(undefined); }); })
		},
		add: function(piece) {
			if (!piece) throw "Board:add() needs piece param";
			if (outOfBounds(piece.position())) throw "Board:add() position out of bounds";
			var col = piece.position().col;
			var row = piece.position().row;
			state[row][col] = piece;
		},
		get: function(col, row) {
			if (arguments.length === 1) {
				var position = Path.convert(col);
				col = position.col;
				row = position.row;
			}
			return state[row][col];
		},
		remove: function(col, row) {
			if (arguments.length === 1) {
				var position = Path.convert(col);
				col = position.col;
				row = position.row;
			}
			state[row][col] = undefined;
		},
		pieces: function() {
			return _.size(_.compact(_.flatten(state)));
		},

		// OLD API
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
			var pieces = Board.getPiecesForPlayer(player);
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
		},

		debug: function() {
			var boardAsString = "";
			boardAsString += "Chess Board:\n --------------------------\n";
			_.each(state, function(row, index) {
				_.each(state[index], function(piece) {
					if (!piece) {
						boardAsString += "   ";
					} else {
						var pieceString = piece.get('name').substr(0,1);
						console.log(pieceString);
						if (piece.get('player') === 1) {
							pieceString = pieceString.charAt(0).toUpperCase();
						} else {
							pieceString = pieceString.charAt(0);
						}
						boardAsString += " " + pieceString + " ";
					}
				});
				boardAsString += "\n";
			});
			boardAsString += "---------------------------"
			console.log(boardAsString);
		}
	};


	return Board;

});