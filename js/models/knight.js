define(function (require) {

	var Piece = require('models/piece');
    var board = require('component/boardWrapper');
    var Path = require('component/path');

	var Knight = Piece.extend({
		defaults: _.extend({
			name: 'knight'
		}, Piece.prototype.defaults),
		setInitialPosition: function() {
			this.set('row', this.get('player') === 1 ? 7 : 0);
		},
		getValidMoves: function() {
			var validMoves = [];
			var row = this.row();
			var col = this.col();
			var player = this.get('player');

			function add(col, row) {
				if (col < 0 || col > 7 || row < 0 || row > 7) return;
				validMoves.push(Path.convert(col, row));
			}

			if (this.isEmpty(col+1, row+2) || this.hasOpponentPiece(col+1,row+2)) add(col+1, row+2);
			if (this.isEmpty(col+1, row-2) || this.hasOpponentPiece(col+1,row-2)) add(col+1, row-2);
			if (this.isEmpty(col-1, row+2) || this.hasOpponentPiece(col-1,row+2)) add(col-1, row+2);
			if (this.isEmpty(col-1, row-2) || this.hasOpponentPiece(col-1,row-2)) add(col-1, row-2);

			if (this.isEmpty(col+2, row+1) || this.hasOpponentPiece(col+2,row+1)) add(col+2, row+1);
			if (this.isEmpty(col+2, row-1) || this.hasOpponentPiece(col+2,row-1)) add(col+2, row-1);
			if (this.isEmpty(col-2, row+1) || this.hasOpponentPiece(col-2,row+1)) add(col-2, row+1);
			if (this.isEmpty(col-2, row-1) || this.hasOpponentPiece(col-2,row-1)) add(col-2, row-1);

			return validMoves;
		}
	});


	return Knight;
});