define(function (require) {
	var $ = require('jquery'); 
	var _ = require('underscore'); 
	var Backbone = require('backbone'); 
    var Mustache = require('libs/mustache/mustache');

    return function() {

	    var board = require('models/board');
	    var Queen = require('models/queen');
	    var Pawn = require('models/pawn');

	    board.setUp([[undefined, undefined, undefined, new Queen({player: 2}), undefined, undefined, undefined, undefined],
					 [new Pawn({player: 2, column: 0, row: 1}), new Pawn({player: 2, column: 1, row: 1}), new Pawn({player: 2, column: 2, row: 1}), 
					 new Pawn({player: 2, column: 3, row: 1}), new Pawn({player: 2, column: 4, row: 1}), new Pawn({player: 2, column: 5, row: 1}), 
					 new Pawn({player: 2, column: 6, row: 1}), new Pawn({player: 2, column: 7, row: 1})],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		 			 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]])

		render();

		function render() {
			$('.rook, .horse, .bishop, .queen, .king, .pawn').removeClass('rook horse bishop queen king pawn');
			for (var row=0 ; row < 8 ; row++) {
				for (var col=0 ; col < 8 ; col++) {
					var piece = board.getPieceForPosition(col, row);
					if (piece) $('.row-' + row + '.col-'+col).addClass(piece.get('name'));
				}	
			}
		}		

		function getCellForPath(path) {
			var position = board.path(path);
			return $('.row-' + position.row + '.col-' + position.col);
		}
		
		function getPosition($cell) {
			var position = {
				col: undefined,
				row: undefined
			};

			var classNames = $cell.attr('class').split(" ");

			_.each(classNames, function(className) {
				if (/row-[\d]/g.test(className)) {
					position.row = className.substr(className.length-1, 1);
				} else if (/col-[\d]/g.test(className)) {
					position.col = className.substr(className.length-1, 1);
				}
			});

			return position;
		}

	    function clickHandler(e) {
			var $cell = $(e.currentTarget);

			var position = getPosition($cell);
			var piece = board.getPieceForPosition(position.col, position.row);
			var moves = piece.getValidMoves(board);
			console.log(moves);

			if ($cell.hasClass('validMove')) {
				$('.validMove').removeClass('validMove');
			} else {
				$('.validMove').removeClass('validMove');	
				$cell.addClass('validMove');
				_.each(moves, function(path) {
					var $validMoveCell = getCellForPath(path);
					$validMoveCell.addClass('validMove');
				});
			}
		}

		$('td').click(clickHandler);


    };
});
