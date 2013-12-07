define(function (require) {

	var _ = require('underscore');

	function find(array, name) {
		return _.filter(array, function(piece) { return piece.get('name') === name; }).length;
	}


	var Houdini = {
		_kings: function(pieces) {
			return find(pieces, 'king');
		},
		_queens: function(pieces) {
			return find(pieces, 'queen');
		},
		_rooks: function(pieces) {
			return find(pieces, 'rook');
		},
		_bishops: function(pieces) {
			return find(pieces, 'bishop');
		},
		_knights: function(pieces) {
			return find(pieces, 'knight');
		},
		_pawns: function(pieces) {
			return find(pieces, 'pawn');
		},
		evaluate: function(board) {
			var score;

			var whitePieces = board.getPiecesForPlayer(1);
			var blackPieces = board.getPiecesForPlayer(2);

			var K = Houdini._kings(whitePieces);
			var k = Houdini._kings(blackPieces);
			var Q = Houdini._queens(whitePieces);
			var q = Houdini._queens(blackPieces);
			var R = Houdini._rooks(whitePieces);
			var r = Houdini._rooks(blackPieces);
			var B = Houdini._bishops(whitePieces);
			var b = Houdini._bishops(blackPieces);
			var Kn = Houdini._knights(whitePieces);
			var kn = Houdini._knights(blackPieces);
			var P = Houdini._pawns(whitePieces);
			var p = Houdini._pawns(blackPieces);



		}
	};


	return Houdini;

});