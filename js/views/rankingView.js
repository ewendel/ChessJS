define(function (require) {

	var View = require('base/view');
    var Mustache = require('libs/mustache/mustache');
    var RankingItemTemplate = Mustache.compile(require('text!templates/rankingItem.mustache'));
	var Utils = require('component/utils');
	var events = require('events'); 

	var RankingView = View.extend({
		el: $('#rankings'),
		
		events: {
			'click .ranking-item' : 'playerClicked'
		},
		initialize: function() {
		},
		render: function() {
			this.sortPlayersByScore();

			this.$('.rankings').empty();
			var rankingView = this;
			for (var i = 0; i < players.length; i++) {
				var player = players[i];
				if (!Utils.playerIsActive(player)) continue;
				var html = rankingView.parseTemplate(RankingItemTemplate,
					{ 
						name: player.name,
						rank: (i+1),
						points: parseInt(player.score[season], 10),
						icon: rankingView.getIcon(player.name)
					});
				rankingView.$('.rankings').append(html);
			};
		},
		sortPlayersByScore: function() {
			players = _.sortBy(players, function(player) {
				return player.score[season];
			});
			players = players.reverse();
		},
		playerClicked: function (e) {
			var $player = $(e.currentTarget);
			if ($player.hasClass('selected')) {
				$('.ranking-item').removeClass('selected');
				events.trigger('games:show');
				
			} else {
				$('.ranking-item').removeClass('selected');
				$player.addClass('selected');
				var playerName = $.trim($player.find('.ranking-name').text());
				events.trigger('games:show', playerName);
			}
		},
		getIcon: function(playerName) {
			var lastSession = _.max(sessions, function(session) { return session.sessionId });
			var ctr = 2;
			while (!lastSession.rankings) {
				lastSession = sessions[sessions.length-ctr++];
			}
			var previousLastSession = _.find(sessions, function(session) { return session.sessionId === (lastSession.sessionId - ctr) });
			var currentRank = lastSession.rankings[playerName];
			var prevRank = previousLastSession.rankings[playerName];

			if (currentRank === prevRank) {
				return "icon-arrow-right";
			} else if (currentRank < prevRank) {
				return "icon-arrow-up";
			} else {
				return "icon-arrow-down";
			}

		}
	});


	return RankingView;
});