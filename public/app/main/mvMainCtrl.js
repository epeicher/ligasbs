angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvMatch, dateUtils){
	$scope.players =  $resource('/api/league').get();

	$scope.match = mvMatch.get(function() {		
		$scope.dateFormatted = dateUtils.getConfigTimeZoneFormatted($scope.match.dateOfMatch);
	});
	
});