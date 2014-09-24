var Player = function(n) {
	this.name= n; 	
	this.playedMatches= 0; 
	this.won= 0; 
	this.tie= 0; 
	this.lost= 0; 
	this.goalsFor= 0; 
	this.goalsAgainst= 0; 
	this.scoredGoals= 0; 
	this.points= 0;
	this.matches= [];
	this.isArchived = false;
}

var players = [
	new Player("Gines"),
	new Player("Lazaro"),
	new Player("David P"),
	new Player("Sergio"),
	new Player("Ignacio"),
	new Player("Marcos"),
	new Player("Jose"),
	new Player("Roberto"),
	new Player("Diego"),
	new Player("Gabi"),
	new Player("Jorge"),
	new Player("Antonio Garcia"),
	new Player("Javier"),
	new Player("Alfonso"),
	new Player("Antonio Gallardo"),
	new Player("Francisco"),
	new Player("Raul"),
	new Player("Daniel"),
	new Player("Emilio"),
	new Player("Juan Carlos"),
	new Player("Marco"),
	new Player("Jose Luis")
]


exports.players = players;