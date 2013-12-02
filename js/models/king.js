define(function (require) {

	var Piece = require('models/piece');
    var board = require('models/board');
    var Path = require('component/path');

	var King = Piece.extend({
		defaults: {
			player: undefined,
			row: undefined,
			col: undefined,
			name: 'king'
		},
		initialize: function(options) {
			this.setInitialPosition();
		},
		setInitialPosition: function() {
			this.set('row', this.officerRow());
			this.set('col', 4);
		},
		getValidMoves: function(specials) {
			var validMoves = [];
			var row = this.row();
			var col = this.col();
			var player = this.get('player');
			var self = this;

			function add(col, row) {
				if (col < 0 || col > 7 || row < 0 || row > 7) return;
				validMoves.push(Path.convert(col, row));
			}

			if (this.isEmpty(col+1, row) || this.hasOpponentPiece(col+1,row)) add(col+1, row);
			if (this.isEmpty(col-1, row) || this.hasOpponentPiece(col-1,row)) add(col-1, row);
			if (this.isEmpty(col, row+1) || this.hasOpponentPiece(col,row+1)) add(col, row+1);
			if (this.isEmpty(col, row-1) || this.hasOpponentPiece(col,row-1)) add(col, row-1);
			// corners
			if (this.isEmpty(col+1, row-1) || this.hasOpponentPiece(col+1,row-1)) add(col+1, row-1);
			if (this.isEmpty(col+1, row+1) || this.hasOpponentPiece(col+1,row+1)) add(col+1, row+1);
			if (this.isEmpty(col-1, row-1) || this.hasOpponentPiece(col-1,row-1)) add(col-1, row-1);
			if (this.isEmpty(col-1, row+1) || this.hasOpponentPiece(col-1,row+1)) add(col-1, row+1);

			function castlingPossible(piece) {
				// ensure nullsafe
				if (!piece) return false;
				if (!piece.isRook()) return false;
				if (piece.has('moved')) return false;

				var ownColumn = self.get('col');
				var otherColumn = piece.get('col');
				var ownRow = self.get('row');

				// check that all positions between king and rook are free
				var startColumn = ownColumn > otherColumn ? ownColumn - 1 : ownColumn + 1;
				if (ownColumn > otherColumn) {
					for ( var col = startColumn; col > 0 && col < 7 ; col-- ) if (!self.isEmpty(col, ownRow)) return false;
				} else {
					for ( var col = startColumn; col > 0 && col < 7 ; col++ ) if (!self.isEmpty(col, ownRow)) return false;					
				}

				var skippedPosition = { 
					col: ownColumn > otherColumn ? ownColumn - 1 : ownColumn + 1,
					row: ownRow 
				};

				// check that the position the rook will land on is not attackable by opponent
				var opponentPieces = board.getPiecesForPlayer(self.other());
				for (var i = 0 ; i < opponentPieces.length ; i++) {
					var piece = opponentPieces[i];
					if (piece.canMoveTo(skippedPosition.col, skippedPosition.row)) return false;
				}
				return true;
			}

			// castling
			if (specials && !this.has('moved')) {
				var leftCornerPiece = board.getPieceForPosition(0, this.officerRow());
				var rightCornerPiece = board.getPieceForPosition(7, this.officerRow());
				var leftCastling = castlingPossible(leftCornerPiece);
				var rightCastling = castlingPossible(rightCornerPiece);
				if (leftCastling) add(col-2, row);
				if (rightCastling) add(col+2, row);

			}

			return validMoves;
		},
		move: function(col, row) {
			col = _.isString(col) ? parseInt(col, 10) : col;
			row = _.isString(row) ? parseInt(row, 10) : row;
			var oldCol = this.col();

			var isCastling = Math.abs(this.col() - col) === 2;
			Piece.prototype.move.call(this, col, row);
			if (isCastling) {
				var leftDirection = oldCol > col;
				var rook = board.getPieceForPosition(leftDirection ? 0 : 7, this.row())
				rook.move(leftDirection ? 3 : 5, row, true);
			}
		}
	});


	return King;
});