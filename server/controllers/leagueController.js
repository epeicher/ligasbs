var Players = require('mongoose').model('Players');

function getSortCriteria() {
	return '-points -playedMatches -scoredGoals name'
}

exports.getLeagueTable = function(req, res) {
	Players.find({isArchived: false})
		.sort(getSortCriteria())
		.exec(function(err, collection) {	
			res.send(collection);
		});
};
