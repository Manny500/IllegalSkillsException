//Global
var boardTId;
var cIdGlobal;
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
		controller : "home2"

	}).when("/RegisterUser", {
		templateUrl : "static/features/form/register.html"

	}).when("/Trello", {
		templateUrl : "static/features/trello/trello.html",
		controller : "trello"

	}).when("/BurnChart", {
		templateUrl : "static/features/table/chart.html",
		controller : 'chartCtrl',

	});
	;
});

// //////////////////////////////CONTROLLER/////////////////////////////

app.controller('chartCtrl', function(dataChart) {

	chart = this;

	chart.loadChart = dataChart.getChart;

	chart.loadChart();

}).service('dataChart', function($http) {

	var dataChart = this;

	dataChart.getChart = function() {

		var chartB = {

			'bId' : boardTId
		}

		$http.post('chart', chartB).then(function(response) {
			displayChart(response.data);
		});
	}

});

// //////////////////////////////CONTROLLER/////////////////////////////

app.controller('trello', function(scrumService) {
	trel = this;

	trel.getInfo = scrumService.info;
	trel.getInfo();

}).service('scrumService', function($http) {
	
	var scrumService = this;
	scrumService.info = function() {
		var trelloB = {
			'bId' : boardTId
		}
		$http.post('trelloInfo', trelloB).then(function(response) {
			
			getTrelloInfo(response,1);
			$(document).ready(function() {
				$("#loading").hide();
			});// &1
		});
	}
});

// //////////////////////////////CONTROLLER/////////////////////////////

app.controller('TestCtrl',function(dataServ) {
	reim = this;
	createB = this;
	addL = this; // add lines
	//card
	createC = this;
	verifyC = this;
	
	// update card thing
	uc = this;
  
	uc.updateCardLane = dataServ.updateCardInfo;
//	uc.updateCardLane();
	
  	reim.getRole = dataServ.info;
	reim.getRole();
	
	reim.updateInfo = function() {
		document.getElementById('updateBtn').style.visibility = 'hidden';
		document.getElementById('profileForm').style.visibility = 'visible';
	}
	
	addL.updateLane = function(){ //1229
		document.getElementById('updateLaneBtn').style.visibility = 'hidden';
		document.getElementById('laneForm').style.visibility = 'visible';
	}
	
	
	createB.startCreate = function(){
		document.getElementById('createBoardBtn').style.visibility = 'hidden';
		document.getElementById('createBoardForm').style.visibility = 'visible';
	};
	
	addL.doneL= function(){  //1229
		addL.updateL = dataServ.updateL;
		addL.updateL();
		
		document.getElementById('updateLaneBtn').style.visibility = 'visible';
		document.getElementById('laneForm').style.visibility = 'hidden';
	}
	
	//card
	createC.startCreate2 = function(){
		document.getElementById('createCardBtn').style.visibility = 'hidden';
		document.getElementById('createCardForm').style.visibility = 'visible';
	};
	
	//verify
	verifyC.startVerify = function(){
		document.getElementById('verifyCardBtn').style.visibility = 'hidden';
		document.getElementById('verifyCardForm').style.visibility = 'visible';
	};
	
	// hide the form and send the ajax request

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
		
		createB.create = function() {
			createB.process = dataServ.process;
			createB.process();

			// hide the form and show the update button and clear
			// input form
			document.getElementById('bTitle').value = "";
			document.getElementById('createBoardBtn').style.visibility = 'visible';
			document.getElementById('createBoardForm').style.visibility = 'hidden';
		}
		
		//card
		createC.create2 = function(){
			createC.process = dataServ.processC;
			createC.process();
			
			// delete all contents of previous table
			$(document).ready(function() {
				$("#loading").show();
				$("#view").find("th").remove();
			});

			// hide the form and show the update button and clear input form
			document.getElementById('cTitle').value = "";
			document.getElementById('laneId').value = 1;
			document.getElementById('cDescription').value = "";
			document.getElementById('cWorth').value = 1;
			document.getElementById('createCardBtn').style.visibility = 'visible';
			document.getElementById('createCardForm').style.visibility = 'hidden';
		}
		
		//verify
		verifyC.verify = function(){
			verifyC.process = dataServ.processV;
			verifyC.process();
			

			// hide the form and show the update button and clear input form
			document.getElementById('cId').value = 1;
			document.getElementById('verifyCardBtn').style.visibility = 'visible';
			document.getElementById('verifyCardForm').style.visibility = 'hidden';
		}
		
	}).service('dataServ', function($http) {
	    var dataService = this;
	    var bDataService = this;
	    var lnDataService = this; //line 1229
	    //card
		var cDataService = this;
		var ucDataService = this;
		var vDataService = this;
					
	dataService.info = function() {

				$http.get('getRole').then(function(response) {

					getRoleType(response);

				});
			}
	
	dataService.viewBoard = function(){
		$http.get('getHome')
	}
	
	ucDataService.updateCardInfo = function(){
		
			// delete all contents of previous table
		
		$(document).ready(function() {
			$("#loading").show();
			$("#view").find("th").remove();
		});

		var ucData = {
				'laneId': uc.updatedLaneId,
				'cId': cIdGlobal
		};
		
		$http.post('updateCardLane', ucData).then(function(response) {
			
			getTrelloInfo(response,1)
			$(document).ready(function() {
				$("#loading").hide();
			});

		});
		
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
	
	lnDataService.updateL = function(){    //1229
		$(document).ready(function() {
			$("#loading").show();
			$("#view").find("th").remove();
		});
		var lnData = {
				'lTitle' : addL.lTitle,
				'bId': boardTId
		}
		$http.post('updateLane', lnData).then(function(response) {
			loadTrelloInfo();
			
		});
	};
	
	//card
	cDataService.processC = function() {
		
		var cData = {
				'cTitle' : createC.cTitle,
				'laneId' : createC.laneId,
				'cDescription' : createC.cDescription,
				'cWorth' : createC.cWorth
		} 
		
		$http.post('createCard', cData).then(function(response) {
			getTrelloInfo(response,1);
			$(document).ready(function() {
				$("#loading").hide();
			});
		});
	};
	
	//verify
	vDataService.processV = function() {
		
		var vData = {
				'cId' : verifyC.cId
				
		} 
		
		$http.post('verifyCard', vData).then(function(response) {
			
			$(document).ready(function() {
				$("#loading").hide();
			});
		});
	};
	
});
	
// //////////////////////////////CONTROLLER/////////////////////////////

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

// //////////////////////////////CONTROLLER/////////////////////////////

app.controller('home2', function(getInfoService2) {

	homeB = this;
	team = this;

	// For Boards
	homeB.getBoards = getInfoService2.boards
	homeB.getBoards();

	// TB stands for team boards
	team.getTB = getInfoService2.tb
	team.getTB();

}).service('getInfoService2', function($http) {

	var getInfoService2 = this;

	getInfoService2.boards = function() {
		$http.get('getHome').then(function(response) {

			loadHome(response, '#!BurnChart');

		});
	}
	getInfoService2.tb = function() {
		$http.get('getTeamBoards').then(function(response) {

			loadTeamBoards(response, '#!BurnChart');

		});
	}
});

// //////////////////////////////CONTROLLER/////////////////////////////

app.controller('home', function(getInfoService) {

	inf = this;
	homeB = this;
	team = this;

	// For Boards
	homeB.getBoards = getInfoService.boards
	homeB.getBoards();

	// TB stands for team boards
	team.getTB = getInfoService.tb
	team.getTB();

}).service('getInfoService', function($http) {

	var getInfoService = this;

	getInfoService.boards = function() {
		$http.get('getHome').then(function(response) {

			loadHome(response, '#!Trello');

		});
	}
	getInfoService.tb = function() {
		$http.get('getTeamBoards').then(function(response) {

			loadTeamBoards(response, '#!Trello');

		});
	}
});

// //////////////////////////////CONTROLLER/////////////////////////////

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

	// Add a helper to format timestamp data
	Date.prototype.formatYYYYDDMM = function() {
		return (this.getFullYear()) + "-" + this.getDate() + "-"
				+ this.getMonth();
	}

	// Split timestamp and data into separate arrays
	var labels = [], data = [];

	function custom_sort(a, b) {
		return new Date(a.chartDate).getTime()
				- new Date(b.chartDate).getTime();
	}

	myData["chart"].sort(custom_sort);

	myData["chart"].forEach(function(chart) {

		labels.push(new Date(chart.chartDate).formatYYYYDDMM());
		data.push(chart.chartSum);

	});

	// Create the chart.js data structure using 'labels' and 'data'
	var tempData = {
		labels : labels,
		datasets : [ {
			fillColor : "rgba(255,255,255,0.2)",
			strokeColor : "rgba(255,255,255,1)",
			pointColor : "rgba(255,255,255,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(255,255,255,1)",
			data : data
		} ]
	};

	// Get the context of the canvas element we want to select
	var ctx = document.getElementById("myChart").getContext("2d");

	// Instantiate a new chart
	var myNewChart = new Chart(ctx, {
		type : "line",
		data : tempData,
		options : {
			title : {
				display : true,
				text : 'BurnDown Chart'
			}
		},
		scales : {
			yAxes : [ {
				ticks : {
					beginAtZero : true,
					min : 0,
					max : 500
				}
			} ]
		}

	});

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

function loadHome(response, href) {

	var clientUser = response.data;

	var tableElement = document.getElementById('view');

	var boardTitle;

	if (clientUser.length == 0) {

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
		content.style.backgroundImage = "url('static/features/img/water.jpg')";
		content.style.backgroundSize = 'contain';
		content.setAttribute('id', clientUser[i]["bId"]);
		content.onclick = goTo;
		content.setAttribute('href', href)
		content.width = '100';
		content.height = '50';
		content.style.color = "black";
		
		tdTitle.appendChild(content);
		tdTitle.height = "60";
		tdTitle.style.textAlign = "center";
		tdTitle.style.fontSize = "xx-large";
		row.appendChild(tdTitle);

		tableElement.appendChild(row);

	}
}

function loadTeamBoards(response, href) {

	var clientUser = response.data;

	var tableElement = document.getElementById('view2');

	var boardTitle;

	if (clientUser.length == 0) {

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
		content.style.backgroundImage = "url('static/features/img/water.jpg')";
		content.style.backgroundSize = 'contain';
		content.setAttribute('id', clientUser[i]["bId"]);
		content.onclick = goTo;
		content.setAttribute('href', href)
		content.width = '100';
		content.height = '50';
		content.style.color = "black";
		tdTitle.appendChild(content);
		tdTitle.height = "60";
		tdTitle.style.textAlign = "center";
		tdTitle.style.fontSize = "xx-large";
		row.appendChild(tdTitle);

		tableElement.appendChild(row);

	}

}

    
function getTrelloInfo(response, check) { // &1 (using this as a marker)
	
	var d = response
	if(check == 1){ //angular
		var trelloInfo = response.data;
	}else{ //ajax
		var trelloInfo = response;
	}
	
	var lanes = trelloInfo.lanes;
	var cards = trelloInfo.cards;
	var tasks = trelloInfo.tasks;

	// sorting the lanes by their id
	lanes = lanes.sort(function(a, b) {
		return a.lId - b.lId;
	})
	cards = cards.sort(function(a, b) {
		return a.cId - b.cId;
	})
	tasks = tasks.sort(function(a, b) {
		return a.tId - b.tId;
	})

	var tableElement = document.getElementById('view');
	var tab = document.createElement('TH');
	tableElement.appendChild(document.createElement('br'));
	for(var i = 0; i < lanes.length; i++){
    	var laneDivs = document.createElement('div');
    	laneDivs.setAttribute("id", "lane"+lanes[i].lId)
    	laneDivs.setAttribute("style", "float:left; margin-left: 30px; margin-right: 30px; overflow: visible; word-wrap: nowrap; color: white;")

    	var row = document.createElement('tr');
    	var tdlTitle = document.createElement('td');
    	
    	var lTitle = lanes[i].lId+"."+lanes[i].lTitle;
    	tdlTitle.innerHTML = lTitle;
    	
    	row.appendChild(tdlTitle);
    	
    	
    	for(var j = 0; j< cards.length; j++){
    		var moveBtn = document.getElementById("move");
    		var aCard = document.createElement('tr')
	    	var aCardTitle = document.createElement('a')
	    	aCardTitle.setAttribute("data-toggle", 'modal')
	    	aCardTitle.setAttribute("data-target", "#myModal")
	    	aCardTitle.setAttribute("id","cid"+cards[j].cId)
	    	aCardTitle.setAttribute("href","!#")
	    	aCardTitle.innerHTML = cards[j].cId+"."+cards[j].cTitle;
    		aCardTitle.style.color = "silver";
    		
    		//getting tasks START
    		aCardTitle.onclick = function(){
    			//cIdGlobal is a global variable containing the id of the card that was clicked
    			cIdGlobal = this.id
    			cIdGlobal= parseInt(cIdGlobal.slice(3)) // getting card Id to pass to updateCardLane()
    			// get the modal
    			var myModal = document.getElementById("myModal");
				var modalContents = myModal.getElementsByClassName("modal-body")[0];
				modalContents.innerHTML = "";
				
    				//task for-loop START
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
        					
        					modalContents.appendChild(label);
        					modalContents.appendChild(taskCheckbox);
        					modalContents.appendChild(document.createElement('br'));
        					
        				}else{
        					modalContents.innerHTML = "";
        				}
    				}//task for-loop END
    			
    			
    		}//getting tasks END
    		
    		moveBtn.onclick = function(card){
    			card = cards
    			
    		}

    		
    		
    		
    		aCard.appendChild(aCardTitle);
    		if(lanes[i].lId == cards[j].laneId){
    			//append card to the lane
    			tdlTitle.appendChild(aCard)
   
    		}
    		
    		
    	}


		laneDivs.appendChild(row);
		tab.appendChild(laneDivs);
		tableElement.appendChild(tab);
    }
	
}

var boardTId;
function goTo(){
	boardTId = this.id;
}

function getBoard() {
	var boardId = this.id;
}

function getTB(){
	var team = this.id;
}



////////////////////ENDJAVASCRIPT/////////////////////////////////////



//AJAX
function loadTrelloInfo(){
	var xhr = new XMLHttpRequest();
	
	var trelloB = {
            'bId': boardTId
    }
	
	trelB = JSON.stringify(trelloB);
	
	
	xhr.onreadystatechange = function(){
		
		if(xhr.readyState == 4 && xhr.status == 200){
            var res = JSON.parse(xhr.responseText)
			getTrelloInfo(res,2);
            $(document).ready(function() {
				$("#loading").hide();
			});

		}
	}
	xhr.open("POST", "trelloInfo", true); 
	xhr.setRequestHeader("Content-type", "application/json");
	
	xhr.send(trelB);
	
}
////////////////////ENDJAVASCRIPT/////////////////////////////////////
