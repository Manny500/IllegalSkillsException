/**
 * 
 */
window.onload = function() {
	
}

var app = angular.module("myHome", [ "ngRoute" ]);

app.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl : "home.html"
	});
});



app.controller('TestCtrl', function() {

	
});



function loadHomepageNavbar(){
	console.log("hello")
	var xhr = new XMLHttpRequest();
	console.log("xhr loaded")
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			navbar = xhr.responseText;
			console.log(navbar)
			document.getElementById('navbar').innerHTML = navbar;
			document.getElementById('boardsView').addEventListener('click', loadBoardView, false);
		}
	}
	
	xhr.open("GET", "../navBar/ajaxNavbar", true);
	xhr.send();
}

function loadBoardView(){
	console.log('testing board view');
}

