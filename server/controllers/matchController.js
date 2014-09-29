var mongoose = require('mongoose'),
	Match = mongoose.model('Match'),
	Players = mongoose.model('Players'),
	Q = require('q');

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


exports.updateMatchResult = function(req, res, next) {
	var match = req.body;	
	var id = match._id;
	delete match._id;	
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

function updatePlayersByMatch(match) {

	var draw = match.result.darkTeam === match.result.lightTeam;
	var darkWins = match.result.darkTeam > match.result.lightTeam;	

	console.log("is draw" + draw);
	console.log("dark wins" + darkWins);

	console.log(match.result);

	var returnedPlayerPromises = Players.where('name').in(match.darkTeam.map(function (p) { return p.name; })).exec().then(

		function(team) {

			var playerPromises = [];

			if(!draw && darkWins) {
				updateTeamPlayerData(team, match, playerPromises, 3, 1, 0, 0, "darkTeam", "lightTeam");			
			}
			else if(!draw && !darkWins) {
				updateTeamPlayerData(team, match, playerPromises, 0, 0, 0, 1, "darkTeam", "lightTeam");
			}
			else if(draw) {
				updateTeamPlayerData(team, match, playerPromises, 1, 0, 1, 0, "darkTeam", "lightTeam");
			}

			var result = Q.fcall(function() {
				return playerPromises;			
			});

			return result;	
		}
	).then(
		function(arrayPromises) {
			var promiseLightTeam = Players.where('name').in(match.lightTeam.map(function (p) { return p.name; })).exec().then(

				function(team) {
					if(!draw && !darkWins) {
						updateTeamPlayerData(team, match, arrayPromises, 3, 1, 0, 0, "lightTeam", "darkTeam");			
					}
					else if(!draw && darkWins) {
						updateTeamPlayerData(team, match, arrayPromises, 0, 0, 0, 1, "lightTeam", "darkTeam");
					}
					else if(draw) {
						updateTeamPlayerData(team, match, arrayPromises, 1, 0, 1, 0, "lightTeam", "darkTeam");
					}

					var result = Q.fcall(function() {
						return arrayPromises;			
					});

					return result;	
				}
			);	
			return promiseLightTeam;
		}
	);

	return returnedPlayerPromises;
}

function updateTeamPlayerData(team, match, playerPromises, points, won, tie, lost, teamName, rivalTeamName) {

	for(i in team) {
		var player = team[i].toObject();		
		var id = player._id;
		delete player._id;
		player.won += won;	
		player.tie += tie;
		player.lost += lost;
		player.points += points;
		player.playedMatches += 1;
		player.scoredGoals += getPlayerScoredGoals(player, match[teamName]);					
		player.goalsFor += match.result[teamName];
		player.goalsAgainst += match.result[rivalTeamName];
		player.matches.push({id:match._id, date: match.dateOfMatch});				
		playerPromises.push(Players.update({_id: id},player).exec());
	}	
}

function getPlayerScoredGoals(a,b) {
	return 0;
}

function onReject(err) {
	console.log("ERROR! " + err);
}