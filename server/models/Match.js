var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({				
	dateOfMatch: {type: Date, required: '{PATH} is required'},
	location: {type: String, required: '{PATH} is required'},
	darkPlayers: [String],
	lightPlayers: [String]
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
			var darkPlayers = ['Buenafuente', 'Wyoming', 'Motos', 'Evole', 'Cantizano'];
			var lightPlayers = ['Prats','Pino','Letizia','John','Doe'];
			Match.create({dateOfMatch: '31 Jun 2014 20:00', location: 'Uni'
				, darkPlayers: darkPlayers, lightPlayers: lightPlayers});
		}
	});
}

exports.createDefaultMatch = createDefaultMatch;