angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvMatch, mvPlayers, dateUtils){
	$scope.players = mvPlayers.query();

	$scope.match = mvMatch.get(function() {		
		$scope.dateFormatted = dateUtils.getConfigTimeZoneFormatted($scope.match.dateOfMatch);
	});
	
});