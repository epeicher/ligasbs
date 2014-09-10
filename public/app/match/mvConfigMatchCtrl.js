angular.module('app').controller('mvConfigMatchCtrl', function($scope, $filter, mvMatch, mvNotifier) {

 	$scope.match = mvMatch.get({_id: -1}, function() {		
		$scope.dateFormatted = getUtcDateTime($scope.match.dateOfMatch);	
		$scope.date = getParsedDateTime($scope.match.dateOfMatch);
	});

	$scope.configMatch = function() {		
		$scope.match.dateOfMatch = getConvertedDateTime($scope.date);
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
		$scope.dateFormatted = getFormattedDateTime(newDate);
	}

	function getUtcDateTime(dt) {	
		return getFormattedDateTime(moment(dt).utc());
	}

	function getFormattedDateTime(dt) {	
		return  moment(dt).format("ddd, D [of] MMM YYYY [at] H:mm");
	}

	function getParsedDateTime(dt){
		var cDate = new Date(dt);
		cDate.setHours(cDate.getHours() - 2);
		return cDate;
	}

	function getConvertedDateTime(dt) {
		var cDate = new Date(dt);
		cDate.setHours(cDate.getHours() + 2);
		return cDate;
	}
});