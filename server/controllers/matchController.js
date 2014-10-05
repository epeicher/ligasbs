var mongoose = require('mongoose'),
	Match = mongoose.model('Match'),
	Players = mongoose.model('Players'),
	url = require('url');

exports.getMatch = function(req, res) {
	var url_parts = url.parse(req.url, true);
	var onlyNotPlayed = {};
	if(url_parts.query.config) 
		onlyNotPlayed = {played: false}; 
	var resMatch;
	Match.findOne(onlyNotPlayed).sort('-dateOfMatch').exec(function(err, collection) {
		resMatch = collection;
	});
	if(!resMatch) {
		var match = Match.createNew();
		resMatch = match;
	}
	res.send(resMatch);

};

exports.updateMatch = function(req, res, next) {
	var match = req.body;	
	var id = match._id;
	delete match._id;	
	Match.update({_id:id}, match, {upsert: true}, function(err, resMatch) {
		res.send(err);
	});	
}


exports.updateMatchResult = function(req, res, next) {
	var match = req.body;	
	var id = match._id;
	delete match._id;	
	match.played = true;
	if(Match.isValid(match)) {
		Match.update({_id:id},match, function(err, resMatch) {
			if(!err) {

				var promis = updatePlayersByMatch(match);

				promis.then(function(result) {				
						res.send();
					},
					onReject
				);
			}
		});	
	}
	else {
		res.send({invalidMatch: true, errors: match.errors});
	}
}

function updatePlayersByMatch(match) {

	var draw = match.result.darkTeam === match.result.lightTeam;
	var darkWins = match.result.darkTeam > match.result.lightTeam;	

	var returnedPlayerPromises = Players.where('name').in(match.darkTeam.map(function (p) { return p.name; })).exec().then(
		function (darkTeam) {

				var promiseLightTeam = Players.where('name').in(match.lightTeam.map(function (p) { return p.name; })).exec().then(

					function(lightTeam) {
							var playerPromises = [];

							if(!draw && darkWins) {
								updateTeamPlayerData(darkTeam, match, playerPromises, 3, 1, 0, 0, "darkTeam", "lightTeam");	
								updateTeamPlayerData(lightTeam, match, playerPromises, 0, 0, 0, 1, "lightTeam", "darkTeam");		
							}
							else if(!draw && !darkWins) {
								updateTeamPlayerData(darkTeam, match, playerPromises, 0, 0, 0, 1, "darkTeam", "lightTeam");
								updateTeamPlayerData(lightTeam, match, playerPromises, 3, 1, 0, 0, "lightTeam", "darkTeam");		
							}
							else if(draw) {
								updateTeamPlayerData(darkTeam, match, playerPromises, 1, 0, 1, 0, "darkTeam", "lightTeam");
								updateTeamPlayerData(lightTeam, match, playerPromises, 1, 0, 1, 0, "lightTeam", "darkTeam");
							}	
					}
				);
		}
	);
	
	return returnedPlayerPromises;
}

function updateTeamPlayerData(team, match, playerPromises, points, won, tie, lost, teamName, rivalTeamName) {

	for(i in team) {
		var player = team[i];		
		var id = player._id;
		player.won += won;	
		player.tie += tie;
		player.lost += lost;
		player.points += points;
		player.playedMatches += 1;
		player.scoredGoals += getPlayerScoredGoals(player, match[teamName]);					
		player.goalsFor += match.result[teamName];
		player.goalsAgainst += match.result[rivalTeamName];
		player.matches.push({id:match._id, date: match.dateOfMatch});				
		player = player.toObject();
		delete player._id;
		playerPromises.push(Players.update({_id: id},player).exec(function(err, player) {
			if(err) { res.send({invalidMatch: true, errors: err}) }
		}));
	}	
}

function getPlayerScoredGoals(a,b) {
	return 0;
}

function onReject(err) {
	console.log("ERROR! " + err);
}