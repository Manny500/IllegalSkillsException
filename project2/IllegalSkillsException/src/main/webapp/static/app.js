/**
 * 
 */
window.onload = function() {
	loadNavbar();
}

var app = angular.module("myHome", [ "ngRoute" ]);

app.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl : "static/features/home/home.html"
	});
});



app.controller('TestCtrl', function() {

	
});


function loadNavbar(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status ==200){
			console.log("navbar loading");
			document.getElementById('navbar').innerHTML = xhr.responseText;
		}
	}
	xhr.open("GET", "ajaxNavbar", true);
	xhr.send();
}


