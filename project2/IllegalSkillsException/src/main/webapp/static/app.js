/**
 * 
 */
window.onload = function() {
	loadNavbar();
}

/////////////////ANGULAR//////////////////////////////////////////
var app = angular.module("myHome", [ "ngRoute" ]);

app.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl : "static/features/home/home.html"
	});
});

app.controller('Type', function(dataService) {

	type = this;
	
	type.getRole  = dataService.role
	
	type.getRole();
	
}).service('dataService', function($http) {

			var dataService = this;
			
			dataService.role = function(){
				
				var indata = {
				
					};
				
				$http.post('role', indata).then(
						function(response) {

					var u = JSON.parse(response);
					console.log(u);
					loadNavbar();
					
				});
			}
});

app.controller('TestCtrl', function() {

	
});
/////////////////ANGULAR//////////////////////////////////////////


function loadNavbar(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200){
			document.getElementById('navbar').innerHTML = xhr.responseText;
		}
	}
	xhr.open("GET", "ajaxNavbar", true);
	xhr.send();
}