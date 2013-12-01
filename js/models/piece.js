define(function (require) {

	var Model = require('base/model');
    var board = require('models/board');
    var _ = require('underscore');

	var Piece = Model.extend({
		defaults: {
			player: undefined,
			row: undefined,
			column: undefined
		},
		isEmpty: function (col, row) {
			return board.positionIsEmpty(col, row);
		},
		hasOpponentPiece: function(col, row) {
			if (this.isEmpty(col,row)) return false;
			return board.getPieceForPosition(col, row).get('player') !== this.get('player');
		}

		
	});


	return Piece;
});