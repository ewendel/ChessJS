define(function (require) {
	var _ = require('underscore'); 

	// initialized from outside
	var state = [
		[], [], [], [], [], [], [], []
	];

	var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	var Board = {
		setUp: function(board) {
			if (!board || !_.isArray(board) || board.length !== 8) {
				throw "Board was set up with illegal params"
			}
			state = board;
		},
		getPieceForPosition: function(column, row) {
			if (arguments.length === 0) throw "getPieceForPosition needs argument";
			return state[row][column];
		},
		setPosition: function(column, row, piece) {
			state[row][column] = piece;
		},
		positionIsEmpty: function(column, row) {
			return state[row][column] === undefined;
		},
		path: function() {
			if (arguments.length === 2) {
				var column = arguments[0];
				var row = arguments[1];
				return columnNames[column] + row;
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