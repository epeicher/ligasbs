var mongoose = require('mongoose'),
	crypto = require('crypto')

var userSchema = mongoose.Schema({
	
	firstName: String,
	lastName: String,
	username: String,
	salt: String,
	hashed_pwd: String,
	roles: [String]
});

userSchema.methods = {
	authenticate: function(passwordToMatch){
		return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	}
}

var User = mongoose.model('User', userSchema);

function createDefaultUser() {
	User.find({}).exec(function(err, collection){
		if(collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'egh');
			User.create({firstName: 'Emilio', lastName: 'Garcia', username: 'egh', salt: salt, hashed_pwd: hash, roles: ['admin'] });
			salt = createSalt();
			hash = hashPwd(salt, 'grc');
			User.create({firstName: 'Gines', lastName: 'Rueda', username: 'grc', salt: salt, hashed_pwd: hash});
			salt = createSalt();
			hash = hashPwd(salt, 'ral');
			User.create({firstName: 'Roberto', lastName: 'Aranda', username: 'ral', salt: salt, hashed_pwd: hash, roles: ['admin']});
		}
	});
}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}

exports.createDefaultUser = createDefaultUser;