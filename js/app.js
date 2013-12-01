define(function (require) {
	var $ = require('jquery'); 
	var _ = require('underscore'); 
	var Backbone = require('backbone'); 
    var Mustache = require('libs/mustache/mustache');

    var pieceNames = 'rook horse bishop queen king pawn';
    var pieceNamesSelector = '.rook, .horse, .bishop, .queen, .king, .pawn';

    return function() {

	    var board = require('models/board');
		var Setup = require('models/setup');
	    board.setUp(Setup.DEFAULT);

		render();

		function render() {
			$(pieceNamesSelector).removeClass(pieceNames);
			$('.p1, .p2').removeClass('p1 p2');
			for (var row=0 ; row < 8 ; row++) {
				for (var col=0 ; col < 8 ; col++) {
					var piece = board.getPieceForPosition(col, row);
					if (piece) $('.row-' + row + '.col-'+col).addClass(piece.get('name')).addClass('p' + piece.get('player'));
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
			var $clickedCell = $(e.currentTarget);
			var clickedPosition = getPosition($clickedCell);
			var piece = board.getPieceForPosition(clickedPosition.col, clickedPosition.row);

			if ($clickedCell.hasClass('selected')) {
				clearState();
			}
			else if ($clickedCell.hasClass('validMove')) {
				var $oldCell = $('.selected');
				var oldPosition = getPosition($oldCell);
				var piece = board.getPieceForPosition(oldPosition.col, oldPosition.row);
				performMove(piece, clickedPosition);
				render();
				$clickedCell.addClass('p' + piece.get('player') + ' ' + piece.get('name'))
				clearState();
			}
			else if (piece) {
				clearState();
				var moves = piece.getValidMoves(board);
				$clickedCell.addClass('selected');
				_.each(moves, function(path) {
					var $validMoveCell = getCellForPath(path);
					$validMoveCell.addClass('validMove');
				});
			} else {
				clearState();
			}

			function performMove(piece, position) {
				var oldPos = board.path(piece.get('col'), piece.get('row'));
				var newPos = board.path(position.col, position.row);
				var className = 'p' + piece.get('player');
				piece.move(position.col, position.row);
				var markup = '<div class="{0}">{1} from {2} to {3}</div>';
				markup = markup.format(className, piece.get('name').capitalize(), oldPos, newPos);
				var node = $(markup);
				console.log(markup);
				$('.history').append(markup);
				
			}

			function clearState() {
				$('.validMove, .selected').removeClass('validMove selected');
			}
		}

		$('td').click(clickHandler);

    };
});
