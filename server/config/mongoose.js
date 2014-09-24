var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	leagueModel = require('../models/League'),
	matchModel = require('../models/Match');


module.exports = function (config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('ligasbs db opened');
	});

	userModel.createDefaultUser();
	leagueModel.createDefaultLeague();
	matchModel.createDefaultMatch();

}
