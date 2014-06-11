angular.module('app').controller('mvMainCtrl', function($scope){
	$scope.players = [
		{name: 'Juan', goals: 2, points: 8, playedMatches: 3},
		{name: 'Pepe', goals: 4, points: 5, playedMatches: 3},
		{name: 'Manolo', goals: 6, points: 0, playedMatches: 4},
		{name: 'Jusep', goals: 3, points: 3, playedMatches: 3},
		{name: 'Wilfredo', goals: 5, points: 5, playedMatches: 4},
		{name: 'Waldo', goals: 2, points: 7, playedMatches: 3},
		{name: 'Ernesto', goals: 5, points: 3, playedMatches: 4},
		{name: 'Ildefonso', goals: 7, points: 5, playedMatches: 3},
		{name: 'Johnson', goals: 8, points: 8, playedMatches: 2},
	]
});