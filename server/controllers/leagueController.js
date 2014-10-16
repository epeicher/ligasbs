var Players = require('mongoose').model('Players');

function getSortCriteria() {
	return '-points -playedMatches -scoredGoals name'
}

exports.getLeagueTable = function(req, res) {
	Players.find({isArchived: false})
		.sort(getSortCriteria())
		.exec(function(err, collection) {	
			var updatedCollection = updatePlayersComputedFields(collection);
			res.send(updatedCollection);
		});
};

function updatePlayersComputedFields(players) {
	if (!players || players.length == 0) return;

	for (i in players) {
		var player = players[i].toObject();
		if(player.playedMatches) {
			player.victoriesPct = player.won / player.playedMatches;
			player.goalsAverage = player.goalsFor - player.goalsAgainst;
			players[i] = player;
		}
	}
	return players;
}
