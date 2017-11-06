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

	}).when("/Trello", {
		templateUrl : "static/features/trello/trello.html",
		controller: "trello"

	});;
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

app.controller('trello', function(scrumService) {
    trel = this; 
    
    trel.getInfo = scrumService.info ;
    trel.getInfo(); 
}).service('scrumService', function($http) {
    var scrumService = this;
    scrumService.info = function() {
        var trelloB = {
                'bId': boardTId
        }
        $http.post('trelloInfo',trelloB).then(function(response) {
            getTrelloInfo(response); //&1
        });
    }
});


app.controller('TestCtrl',function(dataServ) {

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
	

	
	reim.getInfo = dataServ.viewBoard
	var responseb = reim.getInfo();

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

	
	dataService.viewBoard = function(){
		$http.get('getHome')
	}
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
	team = this;
	
	
	// to get role type of user who logged in
	inf.getRole = getInfoService.info
	inf.getRole();
	
	

	// For Boards
	homeB.getBoards = getInfoService.boards
	homeB.getBoards();
	
	// TB stands for team boards
	team.getTB = getInfoService.tb
	team.getTB();
	
	
	
	

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
	getInfoService.tb = function() {
		$http.get('getTeamBoards').then(function(response) {

			loadTeamBoards(response);

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

		
		var tdTitle = document.createElement('td');
		var content = document.createElement('a');
		content.innerHTML = clientUser[i]["bTitle"];
		content.style.backgroundImage = "url('static/features/img/b8.jpg')";
		content.setAttribute('id', clientUser[i]["bId"]);
		content.onclick = goTo;
		content.setAttribute('href', '#!Trello')
		content.width = '100';
		content.height = '50';
		content.style.backgroundSize = 'contain';
		tdTitle.appendChild(content);
		tdTitle.height = "60";
		tdTitle.style.textAlign = "center";
		tdTitle.style.fontSize = "xx-large";
		tdTitle.style.color = "black";
		row.appendChild(tdTitle);
		

		tableElement.appendChild(row);
		

	}
}

function loadTeamBoards(response){
	var clientUser = response.data;

	var tableElement = document.getElementById('view2');

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

		
		var tdTitle = document.createElement('td');
		var content = document.createElement('a');
		content.innerHTML = clientUser[i]["bTitle"];
		content.style.backgroundImage = "url('static/features/img/b8.jpg')";
		content.setAttribute('id', clientUser[i]["bId"]);
		content.onclick = goTo;
		content.setAttribute('href', '#!Trello')
		content.width = '100';
		content.height = '50';
		content.style.backgroundSize = 'contain';
		tdTitle.appendChild(content);
		tdTitle.height = "60";
		tdTitle.style.textAlign = "center";
		tdTitle.style.fontSize = "xx-large";
		tdTitle.style.color = "black";
		row.appendChild(tdTitle);
		

		tableElement.appendChild(row);

	}
	
}

function getTrelloInfo(response){ //&1 (using this as a marker)
	
	var d = response
    var trelloInfo = response.data;
	
    var lanes = trelloInfo.lanes;
    var cards = trelloInfo.cards;
    var tasks = trelloInfo.tasks;

    
    
    //sorting the lanes by their id 
    lanes = lanes.sort(function(a,b){
    			return a.lId - b.lId;
    		})
    cards = cards.sort(function(a,b){
    			return a.cId - b.cId;
    		})
    tasks = tasks.sort(function(a,b){
    			return a.tId - b.tId;
    		})		
    
   console.log(cards)
   console.log(tasks)
    	
    var tableElement = document.getElementById('view');
    //adding a space between navbar and the lanes
    tableElement.appendChild(document.createElement('br'));
    for(var i = 0; i < lanes.length; i++){
    	var laneDivs = document.createElement('div');
    	laneDivs.setAttribute("id", "lane"+lanes[i].lId)
    	laneDivs.setAttribute("style", "float:left; width: 20%; overflow: visible; word-wrap: nowrap")

    	var row = document.createElement('tr');
    	var tdlTitle = document.createElement('td');
    	
    	var lTitle = lanes[i].lId+"."+lanes[i].lTitle;
    	tdlTitle.innerHTML = lTitle;
    	
    	row.appendChild(tdlTitle);
    	
    	
    	for(var j = 0; j< cards.length; j++){
    		var aCard = document.createElement('tr')
	    	var aCardTitle = document.createElement('a')
	    	aCardTitle.setAttribute("data-toggle", 'modal')
	    	aCardTitle.setAttribute("data-target", "#myModal")
	    	aCardTitle.setAttribute("id","cid"+cards[j].cId)
	    	aCardTitle.setAttribute("href","!#")
	    	aCardTitle.innerHTML = cards[j].cTitle;
    		
    		aCardTitle.onclick = function(){
    			// get the modal
    			var myModal = document.getElementById("myModal");
				var modalContents = myModal.getElementsByClassName("modal-body")[0];
				console.log("before clear "+ modalContents.innerHTML)
				modalContents.innerHTML = "";
				
    			
    				for(var k = 0 ; k < tasks.length; k++){
    					
    					//create labels that contain the string of the task 
        				var label = document.createElement('label');
        				label.setAttribute("for", "#"+tasks[k].tInfo);
        				label.innerHTML = tasks[k].tInfo;
        				
        				//create a checkbox specific for each task
        				var taskCheckbox = document.createElement('input');
        				taskCheckbox.setAttribute('type', "checkbox");
        				taskCheckbox.setAttribute('id', "#"+tasks[k].tInfo);
        				
        				//only append info to the modal if id's match
        				if("cid"+tasks[k].cardId == this.id){
        					console.log(tasks[k].tInfo)
        					
        					modalContents.appendChild(label);
        					modalContents.appendChild(taskCheckbox);
        					modalContents.appendChild(document.createElement('br'));
        					
        				}else{
        					modalContents.innerHTML = "";
        				}
    				}
    			
    			
    		}

    		
    		
    		
    		aCard.appendChild(aCardTitle);
    		if(lanes[i].lId == cards[j].laneId){
    			//append card to the lane
    			tdlTitle.appendChild(aCard)
   
    		}
    		
    		
    	}
    	
		laneDivs.appendChild(row);
		
		tableElement.appendChild(laneDivs);
    }
}

var boardTId;
function goTo(){
	boardTId = this.id;
}

function getBoard() {
	console.log(this.id)
	var boardId = this.id;
	

}

function getTB(){
	var team = this.id;
}


////////////////////ENDJAVASCRIPT/////////////////////////////////////


