angular.module('app').controller('mvConfigMatchCtrl', function($scope, $filter, mvMatch, mvNotifier) {

 	$scope.match = mvMatch.get({_id: -1}, function() {		
		$scope.dateFormatted = getFormattedDateTime();
	});

	$scope.configMatch = function() {		
		$scope.match.dateOfMatch = getFixedDateTime();
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
		$scope.dateFormatted = getFormattedDateTime();
	}


	function getFormattedDateTime() {
		//var dtReceived = new Date($scope.match.dateOfMatch);
		//return $filter('date')(dtReceived, "yyyy-MM-dd'T'H:mm");
		return  moment.utc($scope.match.dateOfMatch).format("ddd, D [of] MMM YYYY [at] H:mm");
	}

	function getFixedDateTime() {
		var dt = new Date($scope.dateFormatted);
		console.log("in the getFixedDateTime "+ dt);
		dt.setHours(dt.getHours() + 2);
		console.log("in the getFixedDateTime after calcs "+ dt);
		return dt;
	}
});