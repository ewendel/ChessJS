define(function (require) {

	var Piece = require('models/piece');
    var board = require('models/board');

	var Bishop = Piece.extend({
		defaults: {
			player: undefined,
			row: undefined,
			column: undefined,
			name: 'bishop'
		},
		initialize: function(options) {
			this.setInitialPosition();
		},
		setInitialPosition: function() {
			this.set('row', this.get('player') === 1 ? 7 : 0);
		},
		getValidMoves: function() {
			var validMoves = [];
			var row = this.get('row');
			var col = this.get('column');
			var player = this.get('player');
			var self = this;

			function add(col, row) {
				if (col < 0 || col > 7 || row < 0 || row > 7) return;
				validMoves.push(board.path(col, row));
			}

			function checkPosition(col, row) {
				if (self.isEmpty(col, row)) { 
					add(col, row);
					return true;
				} else if (self.hasOpponentPiece(col, row)) {
					add(col, row);
					return false;
				} else {
					// own piece blocking
					return false;
				}
			}

			// DIAGONALS

			for (var i = 1 ; i < 8 ; i++) if (!checkPosition(col+i, row+i)) break;
			for (var i = 1 ; i < 8 ; i++) if (!checkPosition(col+i, row-i)) break;
			for (var i = 1 ; i < 8 ; i++) if (!checkPosition(col-i, row+i)) break;
			for (var i = 1 ; i < 8 ; i++) if (!checkPosition(col-i, row-i)) break;
			
			return validMoves;
		}
	});


	return Bishop;
});