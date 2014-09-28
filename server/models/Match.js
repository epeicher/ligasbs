var mongoose = require('mongoose'),
League = mongoose.model('League');

function validatorLength(val) {
	return val.length <= 5;
}

var matchSchema = mongoose.Schema({	
	league_id : mongoose.Schema.Types.ObjectId,			
	dateOfMatch: {type: Date, required: '{PATH} is required'},
	location: {type: String, required: '{PATH} is required'},
	darkTeam: {type: [{name:String, scoredGoals:Number}], validate: [validatorLength, 'The length of the team cannnot exceed 5 players']},
	lightTeam: {type: [{name:String, scoredGoals:Number}], validate: [validatorLength, 'The length of the team cannnot exceed 5 players']},
	result: {darkTeam: Number, lightTeam: Number}
});

// matchSchema.methods = {
// 	authenticate: function(passwordToMatch){
// 		return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
// 	}
// }

var Match = mongoose.model('Match', matchSchema);

function createDefaultMatch() {
	Match.find({}).exec(function(err, collection){
		if(collection.length === 0) {
			var darkTeam = [{name:'Diego', scoredGoals: 0}, {name:'Jose', scoredGoals: 0}, {name:'Alfonso', scoredGoals: 0}, {name:'Emilio', scoredGoals: 0}, {name:'Sergio', scoredGoals: 0}];
			var lightTeam = [{name:'David P', scoredGoals: 0},{name:'Antonio Garcia', scoredGoals: 0},{name:'Lazaro', scoredGoals: 0},{name:'Marcos', scoredGoals: 0},{name:'Gines', scoredGoals: 0}];
			League.findOne({}).exec()
				.then(function(league) {
					Match.create(
						{
							dateOfMatch: '31 Jun 2014 20:00', 
							location: 'Uni',
							darkTeam: darkTeam, 
							lightTeam: lightTeam,
							league_id: league._id,
							result : {darkTeam: 0, lightTeam: 0}
						}
					);

				});
		}
	});
}

exports.createDefaultMatch = createDefaultMatch;