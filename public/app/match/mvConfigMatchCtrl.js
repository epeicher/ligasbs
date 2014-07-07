angular.module('app').controller('mvConfigMatchCtrl', function($scope, $filter, mvMatch) {

	$scope.match = mvMatch.get({_id: -1}, function() {
		var dtReceived = $scope.match.dateOfMatch;
		$scope.dateFormatted = $filter('date')(dtReceived, "yyyy-MM-dd'T'H:mm");
	});



	$scope.configMatch = function() {
		$scope.match.dateOfMatch = new Date($scope.dateFormatted);
		mvMatch.update({_id:$scope.match._id}, $scope.match);
	}
});