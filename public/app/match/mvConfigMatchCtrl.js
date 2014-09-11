angular.module('app').controller('mvConfigMatchCtrl', function($scope, mvMatch, mvNotifier, dateUtils) {

 	$scope.match = mvMatch.get({_id: -1}, function() {		
		$scope.dateFormatted = dateUtils.getConfigTimeZoneFormatted($scope.match.dateOfMatch);	
		$scope.date = dateUtils.convertLocalToConfigZone($scope.match.dateOfMatch);
	});

	$scope.configMatch = function() {		
		$scope.match.dateOfMatch = dateUtils.convertConfigZoneToLocal($scope.date);
		mvMatch.update({_id:$scope.match._id}, $scope.match)
			.$promise.then(
				function(value) {					
					console.log("Returned value" + value);
					mvNotifier.notify("Match saved successfully");
				},
				function(error){
					mvNotifier.error("Error when saving match");
				}
			);
	}

	$scope.onTimeSet = function (newDate, oldDate) {
		$scope.dateFormatted = dateUtils.getFormattedDateTime(newDate);
	}

});