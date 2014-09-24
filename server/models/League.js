var mongoose = require('mongoose'), 
	playersData = require('./playersData.js');

var playersSchema = mongoose.Schema({
	league_id : mongoose.Schema.Types.ObjectId,
	name: String, 
	playedMatches: Number, 
	won: Number, 
	tie: Number, 
	lost: Number, 
	goalsFor: Number, 
	goalsAgainst: Number, 
	scoredGoals: Number, 
	points: Number,
	matches: [{date: Date, scoredGoals: Number}],
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
	Players.find({}).exec(function(err, collection) {		
		if(collection.length === 0) {		
			League.create({StartDate: new Date(), Open: true})
				.then(function(league){
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