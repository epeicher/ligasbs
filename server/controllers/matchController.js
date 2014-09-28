var Match = require('mongoose').model('Match');

exports.getMatch = function(req, res) {
	Match.findOne({}).sort('-dateOfMatch').exec(function(err, collection) {
		res.send(collection);
	});
};

exports.updateMatch = function(req, res, next) {
	var match = req.body;	
	var id = match._id;
	delete match._id;	
	Match.update({_id:id},match, function(err, resMatch) {
		res.send();
	});	
}
