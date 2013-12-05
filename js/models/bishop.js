define(function (require) {

	var Piece = require('models/piece');
    var board = require('models/board');
    var Path = require('component/path');

	var Bishop = Piece.extend({
		defaults: _.extend({
			name: 'bishop'
		}, Piece.prototype.defaults),
		getValidMoves: function() {
			var validMoves = [];
			var row = this.row();
			var col = this.col();
			var player = this.get('player');
			var self = this;

			function add(col, row) {
				if (col < 0 || col > 7 || row < 0 || row > 7) return;
				validMoves.push(Path.convert(col, row));
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