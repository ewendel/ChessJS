define(function (require) {
	var _ = require('underscore'); 

	// initialized from outside
	var state = [
		[], [], [], [], [], [], [], []
	];

	var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	function outOfBounds(col, row) {
		if (col < 0 || col > 7 || row < 0 || row > 7) return true;
		return false;
	}

	var Board = {
		setUp: function(board) {
			if (!board || !_.isArray(board) || board.length !== 8) {
				throw "Board was set up with illegal params"
			}
			state = board;
		},
		getPieceForPosition: function(col, row) {
			if (arguments.length === 0) throw "getPieceForPosition needs argument";
			if (outOfBounds(col, row)) return undefined;
			return state[row][col];
		},
		setPosition: function(col, row, piece) {
			if (outOfBounds(col, row)) return undefined;
			state[row][col] = piece;
		},
		positionIsEmpty: function(col, row) {
			if (outOfBounds(col, row)) return undefined;
			return state[row][col] === undefined;
		},
		path: function() {
			if (arguments.length === 2) {
				var col = arguments[0];
				var row = arguments[1];
				return columnNames[col] + row;
			} else {
				var path = arguments[0];
				for (var i=0 ; i < 8 ; i++) {
					if (path.substr(0,1) === columnNames[i]) {
						return {
							col: i,
							row: path.substr(1,2)
						};
					}
				}
			}
		}
	};


	return Board;

});