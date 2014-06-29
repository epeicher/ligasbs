var Match = require('mongoose').model('Match');

exports.getMatch = function(req, res) {
	Match.findOne({}).sort('-dateOfMatch').exec(function(err, collection) {
		res.send(collection);
	});
};

exports.updateMatch = function(req, res) {
	console.log("Now I should save this: " + req);
}