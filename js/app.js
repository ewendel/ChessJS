define(function (require) {
	var $ = require('jquery'); 
	var _ = require('underscore'); 
	var Backbone = require('backbone'); 
    var Mustache = require('libs/mustache/mustache');
    var eventBus = require('component/events');

    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');

    var pieceNames = 'rook horse bishop queen king pawn';
    var pieceNamesSelector = '.rook, .horse, .bishop, .queen, .king, .pawn';

    return function() {

    	if ($.browser.msie && parseInt($.browser.version,10) < 9) {
    		$('body').empty();
    		alert('Du bruker en gammel nettleser som ikke støttes. Oppgrader til Google Chrome, Mozilla Firefox eller en annen moderne nettleser for å bruke denne siden');
    		return;

    	}

	    var board = require('models/board');
		var Setup = require('models/setup');
	    board.setUp(Setup.DEFAULT);

	    var turn = 1;

		render();

		function render() {
			$('table').find(pieceNamesSelector).removeClass(pieceNames);
			$('table .p1, table .p2').removeClass('p1 p2');
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
				changeTurn();
				render();
				$clickedCell.addClass('p' + piece.get('player') + ' ' + piece.get('name'))
				clearState();
			}
			else if (piece && hasTurn(piece)) {
				clearState();
				var moves = piece.getValidMoves(true);
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
				$('.history').prepend(markup);
			}

			function clearState() {
				$('.validMove, .selected').removeClass('validMove selected');
			}

			function changeTurn() {
				$('.turn').toggleClass('p1 p2');
				turn === 1 ? turn++ : turn--;
			}

			function hasTurn(piece) {
				return piece.get('player') == turn;	
			}
		}

		function showPromotionView() {
			var $table = $('table');
			var $promotion = $('.promotion');

			var width = $table.outerWidth();
			var height = $table.outerHeight();
			var top = $table.offset().top;
			var left = $table.offset().left;

			$promotion.css({ width: width, height: height, top: top, left: left }).addClass('visible');
		};

		function hidePromotionView() {
			$('.promotion').removeClass('visible');
		};

		function promote(type) {
		};

		function promoteHandler(e) {
			var $elt = $(e.currentTarget);
			var pawn = board.findPromotionCandidate();
			var piece;
			if ($elt.hasClass('rook')) {
				piece = new Rook({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($elt.hasClass('horse')) {
				piece = new Horse({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($elt.hasClass('bishop')) {
				piece = new Bishop({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($elt.hasClass('queen')) {
				piece = new Queen({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			}
			board.setPosition(pawn.col(), pawn.row(), piece);
			hidePromotionView();
			render();
		};

		$('td').click(clickHandler);

		$('.selectablePiece').click(promoteHandler);

		eventBus.on('promotion', showPromotionView);

    };
});
