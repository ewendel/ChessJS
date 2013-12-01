define(function (require) {

	var Model = require('base/model');
    var board = require('models/board');
    var _ = require('underscore');

	var Piece = Model.extend({
		defaults: {
			player: undefined,
			row: undefined,
			col: undefined
		},
		isEmpty: function (col, row) {
			return board.positionIsEmpty(col, row);
		},
		hasOpponentPiece: function(col, row) {
			if (this.isEmpty(col,row)) return false;
			var piece = board.getPieceForPosition(col, row);
			return piece && piece.get('player') !== this.get('player');
		},
		outOfBounds: function(col, row, offset) {
			var offset = offset ? offset : 0;
			if (col + offset < 0 
			 	 || col + offset > 7
				 || row + offset < 0 
				 || row + offset > 7
				 || col - offset < 0 
			 	 || col - offset > 7
				 || row - offset < 0 
				 || row - offset > 7
			) {
				return true;
			}	

			return false;
		},
		row: function() {
			return parseInt(this.get('row'), 10);
		},
		col: function() {
			return parseInt(this.get('col'), 10);
		},
		move: function(col, row) {
			var validMoves = this.getValidMoves();
			var path = board.path(col, row);
			if (!_.contains(validMoves, path)) {
				throw 'User tried to perform illegal move!';
			}
			board.setPosition(col, row, this);
			board.setPosition(this.get('col'), this.get('row'), undefined);
			this.set({
				col: col,
				row: row
			});
		}

		
	});


	return Piece;
});