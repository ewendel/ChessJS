define(function (require) {

	var Piece = require('models/piece');
    var board = require('component/boardWrapper');
    var eventBus = require('component/events');
    var Path = require('component/path');

	var Pawn = Piece.extend({
		defaults: _.extend({
			name: 'pawn'
		}, Piece.prototype.defaults),
		getValidMoves: function() {
			var validMoves = [];
			var row = this.row();
			var col = this.col();
			var player = this.get('player');

			var forwardRow = player === 1 ? row-1 : row+1;
			
			if (!this.has('moved')) {
				validMoves.push(Path.convert(col, player === 1 ? 5 : 2));
				validMoves.push(Path.convert(col, player === 1 ? 4 : 3));
			}
			if (this.isEmpty(col, forwardRow)) validMoves.push(Path.convert(col, forwardRow));
			if (this.hasOpponentPiece(col+1, forwardRow)) validMoves.push(Path.convert(col+1, forwardRow));
			if (this.hasOpponentPiece(col-1, forwardRow)) validMoves.push(Path.convert(col-1, forwardRow));


			return validMoves;
		},
		rank: function() {
			if (this.id() === 1) {
				return Math.abs(this.row() - 7) + 1;
			} else {
				return this.row() + 1;
			}
		},
		move: function(col, row) {
			Piece.prototype.move.call(this, col, row);
			if (this.rank() === 8) {
				eventBus.trigger('promotion', { col: col, row: row });
			}
		}
	});


	return Pawn;
});