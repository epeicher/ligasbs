angular.module('app').factory('mvMatch', function($resource) {
	var MatchResource = $resource('/api/matches/:id', {_id: "@id"}
		,{
			update: {method:'PUT', isArray: false}
		}
	);

	return MatchResource;
});