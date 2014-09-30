var mongoose = require('mongoose'), 
	playersData = require('./playersData.js');

var min = [0, 'The value of `{PATH}` must be a possitive number.'];
var maxGoals = [100, "Don´t think the `{PATH}` is ({VALUE}). This value is greater than the limit ({MAX})."];
var maxTotalGoals = [1000, "Don´t think the `{PATH}` is ({VALUE}). This value is greater than the limit ({MAX})."];
var possitiveNumber = { type: Number, min: min }
var numberGoals = { type: Number, min: min, max:maxGoals }
var numberTotalGoals = { type: Number, min: min, max:maxTotalGoals }

var playersSchema = mongoose.Schema({
	league_id : mongoose.Schema.Types.ObjectId,
	name: String, 
	playedMatches: possitiveNumber, 
	won: possitiveNumber, 
	tie: possitiveNumber, 
	lost: possitiveNumber, 
	goalsFor: numberTotalGoals, 
	goalsAgainst: numberTotalGoals, 
	scoredGoals: numberGoals, 
	points: possitiveNumber,
	matches: [{date: Date, scoredGoals: numberGoals}],
	isArchived: Boolean
});


var leagueSchema = mongoose.Schema({
	StartDate: Date,
	EndDate: Date,
	Open: Boolean	
});


var League = mongoose.model('League', leagueSchema);
var Players = mongoose.model('Players', playersSchema);


function createDefaultLeague() {	
	Players.find({}).find(function(err, collection) {		
		if(collection.length === 0) {		
			League.create({StartDate: new Date(), Open: true},
				function(err, league) {
					var league_id = league._id;
					var players =playersData.players;					
					for(p in players) {						
						var player = players[p];
						player.league_id = league_id;
						Players.create(player);
					}			
				});			
		}
	});
}

exports.createDefaultLeague = createDefaultLeague;