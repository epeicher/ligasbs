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
	lightTeam: {type: [{name:String, scoredGoals:Number}], validate: [validatorLength, 'The length of the team cannnot exceed 5 players']}
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
			var darkTeam = [{name:'Diego'}, {name:'Jose'}, {name:'Alfonso'}, {name:'Emilio'}, {name:'Sergio'}];
			var lightTeam = [{name:'David P'},{name:'Antonio Garcia'},{name:'Lazaro'},{name:'Marcos'},{name:'Gines'}];
			League.findOne({}).exec()
				.then(function(league) {
					Match.create(
						{
							dateOfMatch: '31 Jun 2014 20:00', 
							location: 'Uni',
							darkTeam: darkTeam, 
							lightTeam: lightTeam,
							league_id: league._id
						}
					);

				});
		}
	});
}

exports.createDefaultMatch = createDefaultMatch;