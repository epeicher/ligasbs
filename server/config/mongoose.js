var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	matchModel = require('../models/Match'),
	leagueModel = require('../models/League');


module.exports = function (config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('ligasbs db opened');
	});

	userModel.createDefaultUser();
	matchModel.createDefaultMatch();
	leagueModel.createDefaultLeague();

}
