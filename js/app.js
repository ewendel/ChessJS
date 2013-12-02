define(function (require) {
	var $ = require('jquery'); 
	var _ = require('underscore'); 
	var Backbone = require('backbone'); 
    var Mustache = require('libs/mustache/mustache');

    var eventBus = require('component/events');
    var Path = require('component/path');
    var LegacyKiller = require('component/legacykiller');

    var HistoryView = require('views/historyView');
    var PromotionView = require('views/promotionView');

    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');
    var Board = require('models/board');
	var Setup = require('models/setup');

    var pieceNames = 'rook horse bishop queen king pawn';
    var pieceNamesSelector = '.rook, .horse, .bishop, .queen, .king, .pawn';

    var computerMode = true;

    return function() {

    	LegacyKiller();
		new HistoryView({ el: $('.history') });
		new PromotionView({ el: $('.promotion'), gameArea: $('table') });
	    Board.init(Setup.PROMOTION);
		eventBus.on('promotion:complete', render);


	    var turn = 1;

		render();

		function performCPUMove(player) {
	    	try {
				if (!player) throw 'performCPUMove needs playerId';
		    	var moves = Board.generateMoves(player);
		    	var move = moves[Math.floor(Math.random()*moves.length)];
		    	var position = Path.convert(move.position);
		    	performMove(move.piece, position);
	    	} catch (e) {
	    		debugger;
	    	}
		};

		function render() {
			$('table').find(pieceNamesSelector).removeClass(pieceNames);
			$('table .p1, table .p2').removeClass('p1 p2');
			for (var row=0 ; row < 8 ; row++) {
				for (var col=0 ; col < 8 ; col++) {
					var piece = Board.getPieceForPosition(col, row);
					if (piece) $('.row-' + row + '.col-'+col).addClass(piece.get('name')).addClass('p' + piece.get('player'));
				}	
			}
		}

		function getCellForPath(path) {
			var position = Path.convert(path);
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
			var piece = Board.getPieceForPosition(clickedPosition.col, clickedPosition.row);

			if ($clickedCell.hasClass('selected')) {
				clearState();
			}
			else if ($clickedCell.hasClass('validMove')) {
				var $oldCell = $('.selected');
				var oldPosition = getPosition($oldCell);
				var piece = Board.getPieceForPosition(oldPosition.col, oldPosition.row);
				performMove(piece, clickedPosition);
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

		}
		function performMove(piece, position) {
			var oldPos = Path.convert(piece.get('col'), piece.get('row'));
			var newPos = Path.convert(position.col, position.row);
			piece.move(position.col, position.row);
			changeTurn();
		}

		function clearState() {
			$('.validMove, .selected').removeClass('validMove selected');
		}

		function changeTurn() {
			$('.turn').toggleClass('p1 p2');
			turn === 1 ? turn++ : turn--;
			turn === 2 && computerMode ? performCPUMove(2) : null;
		}

		function hasTurn(piece) {
			return piece.get('player') == turn;	
		}

		

		$('td').click(clickHandler);



    };
});
