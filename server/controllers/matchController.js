var Match = require('mongoose').model('Match');

exports.getMatch = function(req, res) {
	Match.find({}).exec(function(err, collection) {
		res.send(collection);
	});
};