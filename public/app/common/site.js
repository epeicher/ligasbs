(function(){
	'use strict';
	// grab an element
	var myElement = document.querySelector("header");
	// construct an instance of Headroom, passing the element
	var headroom  = new Headroom(myElement);
	// initialise
	headroom.init(); 

	$('#datetimepicker1').datetimepicker();


}());