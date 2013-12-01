define(function (require) {

	var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');

    var DEFAULT = [
		[new Rook({player: 2, col: 0}), 
		 new Horse({player: 2, col: 1}), 
		 new Bishop({player: 2, col: 2}), 
		 new Queen({player: 2}), 
		 new King({player: 2}), 
		 new Bishop({player: 2, col: 5}), 
		 new Horse({player: 2, col: 6}), 
		 new Rook({player: 2, col: 7})],

		 [new Pawn({player: 2, col: 0, row: 1}), 
		  new Pawn({player: 2, col: 1, row: 1}), 
		  new Pawn({player: 2, col: 2, row: 1}), 
		  new Pawn({player: 2, col: 3, row: 1}), 
		  new Pawn({player: 2, col: 4, row: 1}), 
		  new Pawn({player: 2, col: 5, row: 1}), 
		  new Pawn({player: 2, col: 6, row: 1}), 
		  new Pawn({player: 2, col: 7, row: 1})],

			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],

			 [new Pawn({player: 1, col: 0, row: 6}), 
		  new Pawn({player: 1, col: 1, row: 6}), 
		  new Pawn({player: 1, col: 2, row: 6}), 
		  new Pawn({player: 1, col: 3, row: 6}), 
		  new Pawn({player: 1, col: 4, row: 6}), 
		  new Pawn({player: 1, col: 5, row: 6}), 
		  new Pawn({player: 1, col: 6, row: 6}), 
		  new Pawn({player: 1, col: 7, row: 6})],

			 [new Rook({player: 1, col: 0}), 
			  new Horse({player: 1, col: 1}), 
			  new Bishop({player: 1, col: 2}), 
			  new Queen({player: 1}), 
		  new King({player: 1}), 
		  new Bishop({player: 1, col: 5}), 
		  new Horse({player: 1, col: 6}), 
		  new Rook({player: 1, col: 7})]
		  ];

	var CASTLING = [
		[new Rook({player: 2, col: 0}), 
		 undefined,
		 undefined,
		 undefined,
		 new King({player: 2}), 
		 undefined,
		 undefined,
		 new Rook({player: 2, col: 7})],


			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],


		 [new Rook({player: 1, col: 0}), 
		  undefined,
		  undefined,
		  undefined,
		  new King({player: 1}), 
		  undefined,
		  undefined,
		  new Rook({player: 1, col: 7})]
		  ];

	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}

	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	return {
		DEFAULT: DEFAULT,
		CASTLING: CASTLING
	};	

});