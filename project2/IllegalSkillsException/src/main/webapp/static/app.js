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
//			document.getElementById('tx').addEventListener('click', loadTxView, false);
//			document.getElementById('dashboard').addEventListener('click', loadDashboardView, false);
		}
	}
	xhr.open("GET", "ajaxNavbar", true);
	xhr.send();
}





























//function loadHomepageNavbar(){
//	console.log("hello")
//	var xhr = new XMLHttpRequest();
//	console.log("xhr loaded")
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState == 4 && xhr.status == 200){
//			navbar = xhr.responseText;
//			console.log(navbar)
//			document.getElementById('navbar').innerHTML = navbar;
//			document.getElementById('boardsView').addEventListener('click', loadBoardView, false);
//		}
//	}
//	
//	xhr.open("GET", "ajaxNavbar", true);
//	xhr.send();
//}
//
//function loadBoardView(){
//	console.log('testing board view');
//}

