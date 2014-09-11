angular.module('app').factory('dateUtils', function() {
	var DATE_FORMAT = "ddd, D [of] MMM YYYY [at] H:mm",
		DATE_OFFSET = 120,
		DATE_ZONE = "+0200";

	return {
		getFormattedDateTime: function(dt) {
			return moment(dt).format(DATE_FORMAT);
		},

		convertLocalToConfigZone : function(dt) {
			return moment(dt).add(DATE_OFFSET+moment().zone(),'m').toDate();
		},

		convertConfigZoneToLocal : function(dt) {
			return moment(dt).subtract(DATE_OFFSET+moment().zone(),'m').toDate();
		},

		getConfigTimeZoneFormatted: function(dt) {
			return moment(dt).zone(DATE_ZONE).format(DATE_FORMAT);
		}

	};

});