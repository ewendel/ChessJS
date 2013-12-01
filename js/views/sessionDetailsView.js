define(function (require) {

	var GameListView = require('views/gameListView');
    var Mustache = require('libs/mustache/mustache');
    var Template = require('text!templates/sessionDetailsView.mustache');
    var Utils = require('component/utils');
    var SessionDetailsFactory = require('component/sessionDetailsFactory')

	var SessionDetailsView = GameListView.extend({
		template: Mustache.compile(Template),

		initialize: function(session) {
			this.games = session.games || [];
			GameListView.prototype.initialize.apply(this);
			// Session is not yet played, contains only RVSP's
			if (this.games && this.games.length === 0) {
				this.sessionDetails = { toJSON: function() {} };
				this.newSession = true;
				var facebookIds = _.pluck(session.attending, 'id');
				var players = [];
				_.each(facebookIds, function(fID) {
					players.push(Utils.findPlayerFromFacebookId(fID));
				});
				this.groups = Utils.createGroupsFromRanking(players);
				this.title = "Gruppeoppsett " + Utils.getSessionNameForSessionId(session.sessionId);
			} else {
				this.sessionId = session.sessionId;
				this.sessionDetails = SessionDetailsFactory.createCollection(this.games);
				this.title = Utils.getSessionNameForSessionId(session.sessionId);
				this.newSession = false;
			}
		},
		render: function() {
			this.details = this.sessionDetails.toJSON();
			GameListView.prototype.render.call(this, this.games, this.details, { sessionId: this.sessionId });

		}
	});


	return SessionDetailsView;
});