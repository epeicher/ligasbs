angular.module('app').controller('mvConfigMatchCtrl', function($scope, mvMatch) {

	$scope.match = mvMatch.get({_id: -1}, function() {
		$scope.dateFormatted = $scope.match.dateOfMatch.toLocaleString().slice(0,-1);
	});



	$scope.configMatch = function() {
		mvMatch.update({_id:$scope.match._id}, $scope.match);
	}
});