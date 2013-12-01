define(function (require) {

	var Piece = require('models/piece');

	var Queen = Piece.extend({
		defaults: {
			player: undefined,
			row: undefined,
			column: undefined,
			name: 'queen'
		},
		initialize: function(options) {
			this.setInitialPosition();
		},
		setInitialPosition: function() {
			this.set('row', this.get('player') === 1 ? 7 : 0);
			this.set('column', 3);
		},
		getValidMoves: function(board) {
			var validMoves = [];
			var row = this.get('row');
			var col = this.get('column');
			var player = this.get('player');

			function add(col, row) {
				validMoves.push(board.path(col, row));
			}

			for (var i = row + 1 ; i < 8 ; i++ ) {
				if (this.isEmpty(col, i)) { 
					add(col, i);
				} else if (this.hasOpponentPiece(col, i)) {
					add(col, i);
					break;
				} else {
					// own piece blocking
					break;
				}
			}

			for (var i = row - 1 ; i >= 0 ; i-- ) {
				if (this.isEmpty(col, i)) { 
					add(col, i);
				} else if (this.hasOpponentPiece(col, i)) {
					add(col, i);
					break;
				} else {
					// own piece blocking
					break;
				}
			}

			for (var i = col + 1 ; i < 8 ; i++ ) {
				if (this.isEmpty(i, row)) { 
					add(i, row);
				} else if (this.hasOpponentPiece(i, row)) {
					add(i, row);
					break;
				} else {
					// own piece blocking
					break;
				}
			}

			for (var i = col - 1 ; i >= 0 ; i-- ) {
				if (this.isEmpty(i, row)) { 
					add(i, row);
				} else if (this.hasOpponentPiece(i, row)) {
					add(i, row);
					break;
				} else {
					// own piece blocking
					break;
				}
			}


			return validMoves;
		}
	});


	return Queen;
});