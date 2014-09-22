var mongoose = require('mongoose'), 
	playersData = require('./playersData.js');

function validatorLength(val) {
	return val.length <= 5;
}

var leagueSchema = mongoose.Schema({				
	players: [
		{
			name: String, 
			playedMatches: Number, 
			won: Number, 
			tie: Number, 
			lost: Number, 
			goalsFor: Number, 
			goalsAgainst: Number, 
			scoredGoals: Number, 
			points: Number,
			matches: [Date]
		}
	],

	matches: {
		ligthTeam: { 
			type : [
				{
					name: String, 
					goals: Number
				}								
			],
			validate: [validatorLength, 'The length of the team cannnot exceed 5 players']
		}, 
		darkTeam: { 
			type : [
				{
					name: String, 
					goals: Number
				}								
			],
			validate: [validatorLength, 'The length of the team cannnot exceed 5 players']
		}, 
		date: Date
	}
});


var League = mongoose.model('League', leagueSchema);

function createDefaultLeague() {
	League.find({}).exec(function(err, collection){		
		if(collection.length === 0) {		
			League.create({players: playersData.players});
		}
	});
}

exports.createDefaultLeague = createDefaultLeague;