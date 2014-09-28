var auth = require('./auth'),
	mongoose = require('mongoose'),
	matchController = require('../controllers/matchController'),
	leagueControler = require('../controllers/leagueController'),
	User = mongoose.model('User');

module.exports = function (app) {

	app.get('/api/users',  auth.requiresRole('admin'), function(req, res) {
		User.find({}).exec(function(err, collection) {
			res.send(collection);
		});
	});

	app.get('/api/matches', matchController.getMatch);
	app.put('/api/matches', matchController.updateMatch);
	app.post('/api/matches', matchController.updateMatch);

	app.get('/api/league', leagueControler.getLeagueTable);	

	app.get('/partials/*', function(req, res){
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req,res) {
		req.logout();
		res.end();
	});

	app.all('/api/*', function(req,res) {
		res.send(404);
	});

	app.get('*', function (req, res) {	
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

}