angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvMatch, mvPlayers, dateUtils, mvNotifier){
	$scope.players = mvPlayers.query();

	$scope.match = mvMatch.get(function() {		
		$scope.dateFormatted = dateUtils.getConfigTimeZoneFormatted($scope.match.dateOfMatch);

		$scope.getTeamResult = function(team) {
			var result = 0;
			for(i in team) {
				if(team[i].scoredGoals)
					result += team[i].scoredGoals;
			}
			return result;
		}

		$scope.match.result.lightTeam = $scope.getTeamResult($scope.match.lightTeam);
		$scope.match.result.darkTeam = $scope.getTeamResult($scope.match.darkTeam);
	});

	$scope.getButtonText = function (isValid) {
		if(isValid) return "Config Result";
		else return "Invalid Result";
	}

	$scope.configResult = function() {
		$scope.match.result.lightTeam = $scope.getTeamResult($scope.match.lightTeam);
		$scope.match.result.darkTeam = $scope.getTeamResult($scope.match.darkTeam);
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
		if ($scope.match.played) return;

		player.scoredGoals += 1;		
	}

	$scope.showButton = function(match) {
		return !match.played && new Date(match.dateOfMatch) < new Date();
	}

	
});