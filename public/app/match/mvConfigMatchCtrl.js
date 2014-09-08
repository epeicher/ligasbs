angular.module('app').controller('mvConfigMatchCtrl', function($scope, $filter, mvMatch, mvNotifier) {

   $scope.vm = {
        message: "Bootstrap DateTimePicker Directive",
        dateTime: {}
    };

    $scope.$watch('change', function(){
    	console.log('hola caracola');
        console.log($scope.vm.dateTime);
    });

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


	function getFormattedDateTime() {
		var dtReceived = new Date($scope.match.dateOfMatch);
		return $filter('date')(dtReceived, "yyyy-MM-dd'T'H:mm");
	}

	function getFixedDateTime() {
		var dt = new Date($scope.dateFormatted);
		dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
		return dt;
	}
})
.directive('dateTimePicker', function ($rootScope) {

    return {
        require: '?ngModel',
        restrict: 'AE',
        scope: {
            pick12HourFormat: '@',
            language: '@',
            useCurrent: '@',
            location: '@'
        },
        link: function (scope, elem, attrs) {
            elem.datetimepicker({
                pick12HourFormat: scope.pick12HourFormat,
                language: scope.language,
                useCurrent: scope.useCurrent
            })

            //Local event change
            elem.on('blur', function () {

                console.info('this', this);
                console.info('scope', scope);
                console.info('attrs', attrs);


                /*// returns moments.js format object
                scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                // Global change propagation

                $rootScope.$broadcast("emit:dateTimePicker", {
                    location: scope.location,
                    action: 'changed',
                    dateTime: scope.dateTime,
                    example: scope.useCurrent
                });
                scope.$apply();*/
            })
        }
    };
});