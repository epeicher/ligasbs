var League = require('mongoose').model('League');

exports.getLeagueTable = function(req, res) {
	League.findOne().select('players').sort('-players.points name').exec(function(err, collection) {		
		res.send(collection);
	});
};
