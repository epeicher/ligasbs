angular.module('app',['ngResource','ngRoute','ui.bootstrap.datetimepicker']);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider) {

	//initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

	var routeRoleChecks = {
		admin: {
				auth: function(mvAuth) {
					return mvAuth.authoriseCurrentUserForRoute('admin');
				}
		}
	};

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
		.when('/admin/users', {templateUrl: '/partials/admin/user-list', 
			controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
		.when('/match/config-match', {templateUrl: '/partials/match/config-match', 
			controller: 'mvConfigMatchCtrl'
		});
});

angular.module('app').run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if(rejection === 'not authorised') {
			$location.path('/');
		}
	})
})