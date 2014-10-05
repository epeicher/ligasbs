angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvMatch, mvPlayers, dateUtils, mvNotifier){
	$scope.players = mvPlayers.query();

	$scope.match = mvMatch.get(function() {		
		$scope.dateFormatted = dateUtils.getConfigTimeZoneFormatted($scope.match.dateOfMatch);

		$scope.getLightTeamResult = function() {
			return $scope.match.lightTeam[0].scoredGoals
				+ $scope.match.lightTeam[1].scoredGoals
				+ $scope.match.lightTeam[2].scoredGoals
				+ $scope.match.lightTeam[3].scoredGoals
				+ $scope.match.lightTeam[4].scoredGoals;
		}

		$scope.getDarkTeamResult = function() {
			return $scope.match.darkTeam[0].scoredGoals
				+ $scope.match.darkTeam[1].scoredGoals
				+ $scope.match.darkTeam[2].scoredGoals
				+ $scope.match.darkTeam[3].scoredGoals
				+ $scope.match.darkTeam[4].scoredGoals;
		}

		$scope.match.result.lightTeam = $scope.getLightTeamResult();
		$scope.match.result.darkTeam = $scope.getDarkTeamResult();
	});

	$scope.getButtonText = function (isValid) {
		if(isValid) return "Config Result";
		else return "Invalid Result";
	}

	$scope.configResult = function() {
		$scope.match.result.lightTeam = $scope.getLightTeamResult();
		$scope.match.result.darkTeam = $scope.getDarkTeamResult();
		$scope.match.played = true;

		mvMatch.save($scope.match)
			.$promise.then(
				function(value) {
					if(value.invalidMatch) {
						mvNotifier.error("Error when saving match: " + value.errors.join("; "));
						$scope.match.played = false;
					}	
					else {
						$scope.players = mvPlayers.query();				
						mvNotifier.notify("Match saved successfully");						
					}
				},
				function(error){
					mvNotifier.error("Error when saving match");
					$scope.match.played = false;
				}
			);
	}

	$scope.incrementScore = function(player) {
		player.scoredGoals += 1;		
	}

	
});