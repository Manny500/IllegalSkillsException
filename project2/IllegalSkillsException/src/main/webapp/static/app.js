/**
 * 
 */

// ///////////////ANGULAR//////////////////////////////////////////
var app = angular.module("myHome", [ "ngRoute" ]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "static/features/home/home.html",
		controller : "home"

	}).when("/Profile", {
		templateUrl : "static/features/table/profile.html",
		controller : 'profile'

	}).when("/ViewUsers", {
		templateUrl : "static/features/table/listOfUsers.html",
		controller : 'usersList'

	}).when("/Burndown", {
	templateUrl : "static/features/table/burndownChart.html",
	controller : 'chartCtrl'
		
	}).when("/RegisterUser", {
		templateUrl : "static/features/form/register.html",
//		controller: "register"

	});
});

app.controller('chartCtrl', function(dataChart) {

	chart = this;

	chart.loadChart = dataChart.getChart;

	chart.loadChart();

}).service('dataChart', function($http) {

	var dataChart = this;

	dataChart.getChart = function() {

		$http.get('chart').then(function(response) {

			displayChart(response.data);

		});
	}

});

app.controller('TestCtrl', function(dataServ) {

	reim = this;
	
	createB = this;

	reim.updateInfo = function() {
		document.getElementById('updateBtn').style.visibility = 'hidden';
		document.getElementById('profileForm').style.visibility = 'visible';
	}
	
	createB.startCreate = function(){
		document.getElementById('createBoardBtn').style.visibility = 'hidden';
		document.getElementById('createBoardForm').style.visibility = 'visible';
	};
	
	

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
	
	createB.create = function(){
		createB.process = dataServ.process;
		createB.process();

		// hide the form and show the update button and clear input form
		document.getElementById('bTitle').value = "";
		document.getElementById('createBoardBtn').style.visibility = 'visible';
		document.getElementById('createBoardForm').style.visibility = 'hidden';
	}

}).service('dataServ', function($http) {

	var dataService = this;
	var bDataService = this;

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
	
	bDataService.process = function() {
		
		var cbData = {
				'bTitle' : createB.bTitle
		} 
		
		$http.post('createBoard', cbData).then(function(response) {
			loadHome(response);

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

app.controller('home', function(getInfoService) {

	inf = this;
	homeB = this;
	
	
	// to get role type of user who logged in
	inf.getRole = getInfoService.info
	inf.getRole();
	
	

	// For Boards
	homeB.getBoards = getInfoService.boards
	homeB.getBoards();
	
	

}).service('getInfoService', function($http) {

	var getInfoService = this;

	getInfoService.info = function() {

		$http.get('getRole').then(function(response) {

			getRoleType(response);

		});
	}

	getInfoService.boards = function() {
		$http.get('getHome').then(function(response) {

			loadHome(response);

		});
	}
});

app.controller('usersList', function(getUsersService) {

	users = this;

	users.getAllUsers = getUsersService.list

	users.getAllUsers();

}).service('getUsersService', function($http) {

	var getUsersService = this;

	getUsersService.list = function() {

		$http.get('getUsers').then(function(response) {

			getListOfUsers(response);

		});
	}
});



// ///////////////ANGULAR//////////////////////////////////////////

// ///////////////ENDANGULAR//////////////////////////////////////////

// /////////////////D3.JS////////////////////////////////////////////
function displayChart(myData) {
	// set the dimensions and margins of the graph
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top
			- margin.bottom;

	// parse the date / time
	var parseTime = d3.timeParse("%Y");

	// set the ranges
	var x = d3.scaleTime().range([ 0, width ]);
	var y = d3.scaleLinear().range([ height, 0 ]);

	// define the line
	var valueline = d3.line().x(function(d) {
		return x(d.Date);
	}).y(function(d) {
		return y(d.Imports);
	});
	// define the line
	var valueline2 = d3.line().x(function(d) {
		return x(d.Date);
	}).y(function(d) {
		return y(d.Exports);
	});

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("#svg").append("svg").attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).append("g").attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	function draw(data, country) {

		var data = data[country];

		// format the data
		data.forEach(function(d) {
			d.Date = parseTime(d.Date);
			d.Imports = +d.Imports;
			d.Exports = +d.Exports;
		});


		// sort years ascending
		data.sort(function(a, b) {
			return a["Date"] - b["Date"];
		})

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) {
			return d.Date;
		}));
		y.domain([ 0, d3.max(data, function(d) {
			return Math.max(d.Imports, d.Exports);
		}) ]);

		// Add the valueline path.
		svg.append("path").data([ data ]).attr("class", "line").attr("d",
				valueline);
		// Add the valueline path.
		svg.append("path").data([ data ]).attr("class", "line").attr("d",
				valueline2);
		// Add the X Axis
		svg.append("g").attr("transform", "translate(0," + height + ")").call(
				d3.axisBottom(x));

		// Add the Y Axis
		svg.append("g").call(d3.axisLeft(y));
	}

	draw(myData, "Afghanistan");
}
// /////////////////ENDD3.JS////////////////////////////////////////////

// //////////////////JAVASCRIPT/////////////////////////////////////
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
		loadUserNavbar();
	} else if (roleType == 2) {
		loadMasterNavbar();

	}

}

function getListOfUsers(response) {
	// this should be an array/list of users
	client = response.data;

	// trying to iterate through the list gotten from above
	for (var i = 0; i < client.length; i++) {

		// Grab the data from the json
		var userId = client[i].userId;
		var firstName = client[i].firstName;
		var lastName = client[i].lastName;
		var userName = client[i].userName;
		var roleType = client[i].roleType;
		var email = client[i].email;
		var team = client[i].teamId;

		// create the cells - td and give the value to the cells
		var tdID = document.createElement('td');
		var tdFirstName = document.createElement('td');
		var tdLastName = document.createElement('td');
		var tdUser = document.createElement('td');
		var tdRole = document.createElement('td');
		var tdEmail = document.createElement('td');
		var tdTeam = document.createElement('td');

		if (roleType == 1) {
			tdID.innerHTML = userId;
			tdFirstName.innerHTML = firstName;
			tdLastName.innerHTML = lastName;
			tdUser.innerHTML = userName;
			tdRole.innerHTML = roleType;
			tdEmail.innerHTML = email;
			tdTeam.innerHTML = team;

			var row = document.createElement('tr');

			// append the cells to the tr
			row.appendChild(tdID);
			row.appendChild(tdFirstName);
			row.appendChild(tdLastName);
			row.appendChild(tdUser);
			row.appendChild(tdRole);
			row.appendChild(tdEmail);
			row.appendChild(tdTeam);

			// add the row to the table
			var table = document.getElementById('listOfUsers');
			table.appendChild(row);
		}

	}

}

function loadHome(response) {

	var clientUser = response.data;

	var tableElement = document.getElementById('view');
	
	document.body.style.backgroundImage = "url('static/features/img/portfolio/thumbnails/2.jpg')";

	var boardTitle;

	if(clientUser.length == 0){
		
		
		var row = document.createElement('tr');

		var message = document.createElement('td');
		message.innerHTML = 'You have no Boards. Click the button above to create a Board.';
		row.appendChild(message);


		tableElement.appendChild(row);
	}
	
	for (i = 0; i < clientUser.length; i++) {

		var row = document.createElement('tr');

//		var combine = document.createElement('div');
		
		var tdTitle = document.createElement('td');
		var content = document.createElement('h1');
		content.innerHTML = clientUser[i]["bTitle"];
		content.style.backgroundImage = "url('static/features/img/water.jpg')";
		content.setAttribute('id', clientUser[i]["bId"]);
		content.addEventListener('click', getBoard, false);
		content.width = '100';
		content.height = '50';
		content.style.backgroundSize = 'contain';
		tdTitle.appendChild(content);
		tdTitle.height = "60";
		row.appendChild(tdTitle);
		
//		var tdTitle = document.createElement('td');
//		tdTitle.innerHTML = clientUser[i]["bTitle"];
//		tdTitle.style.backgroundImage = "url('static/features/img/boardP.jpg')";
//		tdTitle.setAttribute('id', clientUser[i]["bId"]);
//		tdTitle.addEventListener('click', getBoard, false);
//		tdTitle.width = '100';
//		tdTitle.height = '50';
//		tdTitle.style.backgroundSize = '100px, 50px';
//		row.appendChild(tdTitle);
		
//		var link = document.createElement('img');
//		link.setAttribute('src', 'static/features/img/boardP.jpg');
//		link.setAttribute('id', clientUser[i]["bId"]);
//		link.width = '100';
//		link.height = '100';
//		link.addEventListener('click', getBoard, false);
		
		
//		var tdTitle = document.createElement('td');
//		tdTitle.innerHTML = clientUser[i]["bTitle"];
//		row.appendChild(tdTitle);
//		
//		var link = document.createElement('img');
//		link.setAttribute('src', 'static/features/img/boardP.jpg');
//		link.setAttribute('id', clientUser[i]["bId"]);
//		link.width = '100';
//		link.height = '100';
//		link.addEventListener('click', getBoard, false);
//		row.appendChild(link);

//		var link = document.createElement('button');
//		link.innerHTML = 'Go to board';
//		link.setAttribute('id', clientUser[i]["bId"]);
//		link.addEventListener('click', getBoard, false);
//		link.setAttribute('class', 'btn btn-info');
//		row.appendChild(link);

		
		
		tableElement.appendChild(row);

	}


}

function getBoard() {
	console.log(this.id)
	var boardId = this.id;
	

}




// //////////////////ENDJAVASCRIPT/////////////////////////////////////

