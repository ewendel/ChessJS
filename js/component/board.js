define(function (require) {
	var _ = require('underscore'); 
    var eventBus = require('component/events');
    var Path = require('component/path');

	function outOfBounds(col, row) {
		if (arguments.length === 1) {
			var position = arguments[0];
			col = position.col;
			row = position.row;
		}
		if (col < 0 || col > 7 || row < 0 || row > 7) return true;
		return false;
	}

	return function() {
		var self = this;
		this.state = [[],[],[],[],[],[],[],[]];

		// NEW API
		this.clear = function() {
			self.state = undefined;
			self.state = [];
			_.times(8, function() { self.state.push([]); _.times(8, function() { _.last(self.state).push(undefined); }); });
		};

		this.add = function(piece) {
			if (!piece) throw "Board:add() needs piece param";
			if (outOfBounds(piece.position())) throw "Board:add() position out of bounds";
			var col = piece.position().col;
			var row = piece.position().row;
			self.state[row][col] = piece;
		};

		this.get = function(col, row) {
			if (arguments.length === 1) {
				var position = Path.convert(col);
				col = position.col;
				row = position.row;
			}
			return self.state[row][col];
		};

		this.remove = function(col, row) {
			if (arguments.length === 1) {
				var position = Path.convert(col);
				col = position.col;
				row = position.row;
			}
			self.state[row][col] = undefined;
		};

		this.pieces = function() {
			return _.size(_.compact(_.flatten(self.state)));
		};

		// OLD API
		this.init = function(board) {
			if (!board || !_.isArray(board) || board.length !== 8) {
				throw "Board was set up with illegal params"
			}
			self.state = board;
		};

		this.getPieceForPosition = function(col, row) {
			if (arguments.length === 0) throw "getPieceForPosition needs argument";
			if (outOfBounds(col, row)) return undefined;
			return self.state[row][col];
		};

		this.setPosition = function(col, row, piece) {
			if (outOfBounds(col, row)) return undefined;
			self.state[row][col] = piece;
		};

		this.positionIsEmpty = function(col, row) {
			if (outOfBounds(col, row)) return undefined;
			return self.state[row][col] === undefined;
		};

		this.getPiecesForPlayer = function(player) {
			var pieces = [];
			_.each(self.state, function(row) {
				_.each(row, function(piece) {
					if (piece && piece.id() === player) pieces.push(piece);
				});
			})
			return pieces;
		};

		this.generateMoves = function(player) {
			var moves = [];
			var pieces = self.getPiecesForPlayer(player);
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
		};



		this.debug = function() {
			var boardAsString = "";
			boardAsString += "Chess Board:\n --------------------------\n";
			_.each(self.state, function(row, index) {
				_.each(self.state[index], function(piece) {
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
		};
	};

});