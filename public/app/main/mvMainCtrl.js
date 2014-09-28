angular.module('app').controller('mvMainCtrl', function($scope, $resource, mvMatch, mvPlayers, dateUtils){
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

	$scope.configResult = function() {
		mvMatch.save($scope.match);
	}

	$scope.incrementScore = function(player) {
		player.scoredGoals += 1;		
	}

	
});