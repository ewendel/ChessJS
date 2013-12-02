define(function (require) {

	var View = require('base/view');
    var eventBus = require('component/events');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');
    var Board = require('models/board');


	var PromotionView = View.extend({
		events: {
			'click .selectablePiece' : 'promote'
		},
		initialize: function(options) {
			this.$gameArea = options.gameArea;
			eventBus.on('promotion', _.bind(this.show, this));
		},
		show: function() {
			var width = this.$gameArea.outerWidth();
			var height = this.$gameArea.outerHeight();
			var top = this.$gameArea.offset().top;
			var left = this.$gameArea.offset().left;

			this.$el.css({ width: width, height: height, top: top, left: left }).addClass('visible');
		},
		hide: function() {
			this.$el.removeClass('visible');
		},
		promote: function(e) {
			var $clickedPiece = $(e.currentTarget);
			var pawn = Board.findPromotionCandidate();
			var piece;

			if ($clickedPiece.hasClass('rook')) {
				piece = new Rook({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($clickedPiece.hasClass('horse')) {
				piece = new Horse({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($clickedPiece.hasClass('bishop')) {
				piece = new Bishop({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			} else if ($clickedPiece.hasClass('queen')) {
				piece = new Queen({player: pawn.id(), col: pawn.col(), row: pawn.row()});
			}
			Board.setPosition(pawn.col(), pawn.row(), piece);
			this.hide();
			eventBus.trigger('promotion:complete');
		}
	});


	return PromotionView;
});