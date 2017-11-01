/**
 * 
 */
window.onload = function() {
	// loadNavbar();
}

// ///////////////ANGULAR//////////////////////////////////////////
var app = angular.module("myHome", [ "ngRoute" ]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "static/features/home/home.html",
		controller : "role"

	}).when("/Profile", {
		templateUrl : "static/features/table/profile.html",
		controller : 'profile'

	});
});

app.controller('TestCtrl', function(dataServ) {

	reim = this;

	reim.updateInfo = function() {
		document.getElementById('updateBtn').style.visibility = 'hidden';
		document.getElementById('profileForm').style.visibility = 'visible';
	}

	// hide the form and send the ajax request
	reim.done = function() {

		reim.update = dataServ.update;

		reim.update();

		// delete all contents of previous table
		$(document).ready(function() {
			$("#userTable").find("tr:gt(0)").remove();
		});

		// hide the form and show the update button
		document.getElementById('updateBtn').style.visibility = 'visible';
		document.getElementById('profileForm').style.visibility = 'hidden';

	}

}).service('dataServ', function($http) {

	var dataService = this;

	// sends the post information from the profile form
	dataService.update = function() {

		var indata = {
			'firstName' : reim.firstName,
			'lastName' : reim.lastName,
			'userName' : reim.userName,
			'password' : reim.password,
			'email' : reim.email
		};
		
		$http.post('updateProfile', indata).then(function(response) {
			
			getProfileInfo(response);

		});
	};
});

app.controller('profile', function(dataService) {

	prof = this;

	prof.getProfile = dataService.profile

	prof.getProfile();

}).service('dataService', function($http) {

	var dataService = this;

	dataService.profile = function() {

		$http.get('profile').then(function(response) {

			getProfileInfo(response);

		});
	}
});

app.controller('role', function(getInfoService) {

	inf = this;

	inf.getRole = getInfoService.info

	inf.getRole();

}).service('getInfoService', function($http) {

	var getInfoService = this;

	getInfoService.info = function() {

		$http.get('getRole').then(function(response) {

			getRoleType(response);

		});
	}
});

// ///////////////ANGULAR//////////////////////////////////////////

function loadMasterNavbar() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('navbar').innerHTML = xhr.responseText;
		}
	}
	xhr.open("GET", "ajaxNavbar", true);
	xhr.send();
}

function loadUserNavbar() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('navbar').innerHTML = xhr.responseText;
		}
	}
	xhr.open("GET", "userNavbar", true);
	xhr.send();
}

function getProfileInfo(response) {

	client = response.data;

	// Grab the data from the json
	var userId = client.userId;
	var firstName = client.firstName;
	var lastName = client.lastName;
	var userName = client.userName;
	var password = client.password;
	var roleType = client.roleType;
	var email = client.email;
	var team = client.teamId;

	// create the cells - td and give the value to the cells
	var tdID = document.createElement('td');
	var tdFirstName = document.createElement('td');
	var tdLastName = document.createElement('td');
	var tdUser = document.createElement('td');
	var tdPass = document.createElement('td');
	var tdRole = document.createElement('td');
	var tdEmail = document.createElement('td');
	var tdTeam = document.createElement('td');

	tdID.innerHTML = userId;
	tdFirstName.innerHTML = firstName;
	tdLastName.innerHTML = lastName;
	tdUser.innerHTML = userName;
	tdPass.innerHTML = '*****';
	tdRole.innerHTML = roleType;
	tdEmail.innerHTML = email;
	tdTeam.innerHTML = team;

	// create the row -tr
	var row = document.createElement('tr');

	// append the cells to the tr
	row.appendChild(tdID);
	row.appendChild(tdFirstName);
	row.appendChild(tdLastName);
	row.appendChild(tdUser);
	row.appendChild(tdPass);
	row.appendChild(tdRole);
	row.appendChild(tdEmail);
	row.appendChild(tdTeam);

	// add the row to the table
	var table = document.getElementById('userTable');
	table.appendChild(row);
}

function getRoleType(response) {
	client = response.data;
	var roleType = client.roleType;

	if (roleType == 1) {
		loadMasterNavbar();
	} else if (roleType == 2) {
		loadUserNavbar();
	}

}