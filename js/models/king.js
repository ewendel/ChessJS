define(function (require) {

	var Piece = require('models/piece');
    var board = require('models/board');

	var King = Piece.extend({
		defaults: {
			player: undefined,
			row: undefined,
			column: undefined,
			name: 'king'
		},
		initialize: function(options) {
			this.setInitialPosition();
		},
		setInitialPosition: function() {
			this.set('row', this.get('player') === 1 ? 7 : 0);
			this.set('column', 4);
		},
		getValidMoves: function(board) {
			var validMoves = [];
			var row = this.get('row');
			var col = this.get('column');
			var player = this.get('player');

			function add(col, row) {
				if (col < 0 || col > 7 || row < 0 || row > 7) return;
				validMoves.push(board.path(col, row));
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

			return validMoves;
		}
	});


	return King;
});