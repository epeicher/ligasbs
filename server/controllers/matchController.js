var Match = require('mongoose').model('Match');

exports.getMatch = function(req, res) {
	Match.findOne({}).sort('-dateOfMatch').exec(function(err, collection) {
		res.send(collection);
	});
};

exports.updateMatch = function(req, res) {
	var match = req.body;
	var id = match._id;
	console.log("The id is " + JSON.stringify(match));
	delete match._id
	Match.update({_id:id}, match, function(err, resMatch) {
		if(err) console.log("error" + err);
		console.log("Maybe or maybe not" + JSON.stringify(match));
	});
	res.send();
}