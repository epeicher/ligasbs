angular.module('app').factory('mvPlayers', function($resource) {
	return $resource('/api/league');
});