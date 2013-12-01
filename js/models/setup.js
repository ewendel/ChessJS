define(function (require) {


	var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');

    var DEFAULT = [
		[new Rook({player: 2, column: 0}), 
		 new Horse({player: 2, column: 1}), 
		 new Bishop({player: 2, column: 2}), 
		 new Queen({player: 2}), 
		 new King({player: 2}), 
		 new Bishop({player: 2, column: 5}), 
		 new Horse({player: 2, column: 6}), 
		 new Rook({player: 2, column: 7})],

		 [new Pawn({player: 2, column: 0, row: 1}), 
		  new Pawn({player: 2, column: 1, row: 1}), 
		  new Pawn({player: 2, column: 2, row: 1}), 
		  new Pawn({player: 2, column: 3, row: 1}), 
		  new Pawn({player: 2, column: 4, row: 1}), 
		  new Pawn({player: 2, column: 5, row: 1}), 
		  new Pawn({player: 2, column: 6, row: 1}), 
		  new Pawn({player: 2, column: 7, row: 1})],

			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],

			 [new Pawn({player: 1, column: 0, row: 6}), 
		  new Pawn({player: 1, column: 1, row: 6}), 
		  new Pawn({player: 1, column: 2, row: 6}), 
		  new Pawn({player: 1, column: 3, row: 6}), 
		  new Pawn({player: 1, column: 4, row: 6}), 
		  new Pawn({player: 1, column: 5, row: 6}), 
		  new Pawn({player: 1, column: 6, row: 6}), 
		  new Pawn({player: 1, column: 7, row: 6})],

			 [new Rook({player: 1, column: 0}), 
			  new Horse({player: 1, column: 1}), 
			  new Bishop({player: 1, column: 2}), 
			  new Queen({player: 1}), 
		  new King({player: 1}), 
		  new Bishop({player: 1, column: 5}), 
		  new Horse({player: 1, column: 6}), 
		  new Rook({player: 1, column: 7})]
		  ];

	return {
		DEFAULT: DEFAULT
	};	

});