define(function (require) {

	var Model = require('base/model');
    var board = require('models/board');
    var _ = require('underscore');
    var Path = require('component/path');
    var eventBus = require('component/events');

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
		id: function() {
			return this.get('player');
		},
		other: function() {
			return (this.get('player') % 2) + 1;
		},
		row: function() {
			return parseInt(this.get('row'), 10);
		},
		col: function() {
			return parseInt(this.get('col'), 10);
		},
		officerRow: function() {
			return this.get('player') === 1 ? 7 : 0
		},
		pawnRow: function() {
			return this.get('player') === 1 ? 6 : 1
		},
		isRook: function() {
			return this.get('name') === 'rook';
		},
		isHorse: function() {
			return this.get('name') === 'horse';
		},
		isBishop: function() {
			return this.get('name') === 'bishop';
		},
		isQueen: function() {
			return this.get('name') === 'queen';
		},
		isKing: function() {
			return this.get('name') === 'king';
		},
		isPawn: function() {
			return this.get('name') === 'pawn';
		},
		canMoveTo: function(col, row, specials) {
			var validMoves = this.getValidMoves(specials);
			var path = Path.convert(col, row);
			return _.contains(validMoves, path);
		},
		move: function(col, row) {
			var validMove = this.canMoveTo(col, row, true);
			if (!validMove) {
				throw 'User tried to perform illegal move!';
			}
			this._move(col,row);
		},
		_move: function(col, row) {
			var move = {
				piece: this,
				oldPos: Path.convert(this.col(), this.row()),
				newPos: Path.convert(col, row)
			};

			eventBus.trigger('move', move);
			board.setPosition(col, row, this);
			board.setPosition(this.get('col'), this.get('row'), undefined);
			this.set({
				col: col,
				row: row,
				moved: true
			});
		}

		
	});


	return Piece;
});