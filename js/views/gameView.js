define(function (require) {

	var View = require('base/view');
    var Game = require('models/game');
    var Board = require('component/boardWrapper');
    var Path = require('component/path');
    var eventBus = require('component/events');

	var pieceNames = 'rook horse bishop queen king pawn';
    var pieceNamesSelector = '.rook, .horse, .bishop, .queen, .king, .pawn';

	var GameView = View.extend({
		model: Game,

		events: {
			'click td': 'clickHandler'
		},
		initialize: function() {
			eventBus.on('promotion:complete', _.bind(this.render, this));
		},
		render: function() {
			this.$(pieceNamesSelector).removeClass(pieceNames);
			this.$('.p1, .p2').removeClass('p1 p2');

			for (var row=0 ; row < 8 ; row++) {
				for (var col=0 ; col < 8 ; col++) {
					var piece = Board.getPieceForPosition(col, row);
					if (piece) this.$('.row-' + row + '.col-' + col).addClass(piece.get('name')).addClass('p' + piece.get('player'));
				}	
			}
		},
		clickHandler: function(e) {
			var $clickedCell = $(e.currentTarget);
			var clickedPosition = this.getPosition($clickedCell);
			var piece = Board.getPieceForPosition(clickedPosition.col, clickedPosition.row);

			if ($clickedCell.hasClass('selected')) {
				this.clearState();
			}
			else if ($clickedCell.hasClass('validMove')) {
				var $oldCell = this.$('.selected');
				var oldPosition = this.getPosition($oldCell);
				var piece = Board.getPieceForPosition(oldPosition.col, oldPosition.row);
				this.model.performMove(piece, clickedPosition);
				this.render();
				$clickedCell.addClass('p' + piece.get('player') + ' ' + piece.get('name'))
				this.clearState();
			}
			else if (piece && this.model.hasTurn(piece)) {
				this.clearState();
				var moves = piece.getValidMoves(true);
				$clickedCell.addClass('selected');
				var gameView = this;

				_.each(moves, function(path) {
					var $validMoveCell = gameView.getCellForPath(path);
					$validMoveCell.addClass('validMove');
				});

			} else {
				this.clearState();
			}
		},
		clearState: function() {
			this.$('.validMove, .selected').removeClass('validMove selected');
		},
		getPosition: function($cell) {
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
		},
		getCellForPath: function(path) {
			var position = Path.convert(path);
			return this.$('.row-' + position.row + '.col-' + position.col);
		}
	});


	return GameView;
});