define(function (require) {

	var Piece = require('models/piece');
    var board = require('models/board');

	var Pawn = Piece.extend({
		defaults: {
			player: undefined,
			row: undefined,
			column: undefined,
			name: 'pawn'
		},
		initialize: function(options) {
		},
		getValidMoves: function() {
			var validMoves = [];
			var row = this.get('row');
			var col = this.get('column');
			var player = this.get('player');

			var isFirstMove = (player === 1 && row === 6) || (player === 2 && row === 1);

			var forwardRow = player === 1 ? row-1 : row+1;
			
			if (isFirstMove) {
				validMoves.push(board.path(col, player === 1 ? 5 : 2));
				validMoves.push(board.path(col, player === 1 ? 4 : 3));
			}
			if (this.isEmpty(col, forwardRow)) validMoves.push(board.path(col, forwardRow));
			if (this.hasOpponentPiece(col+1, forwardRow)) validMoves.push(board.path(col+1, forwardRow));
			if (this.hasOpponentPiece(col-1, forwardRow)) validMoves.push(board.path(col-1, forwardRow));


			return validMoves;
		}
	});


	return Pawn;
});