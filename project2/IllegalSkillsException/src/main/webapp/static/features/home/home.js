/**
 * 
 */
window.onload = function(){
	loadHomepageNavbar();
}
//function loadHomepage(){
//	console.log("hello");
//	var xhr = new XMLHttpRequest();
//	
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState == 4 && xhr.status == 200){
//			document.getElementById("view").innerHTML = xhr.responseText;
//			loadHomepageNavbar();
//			
//		}
//	}
//	xhr.open("GET", "homepage",true);
//	xhr.send();
//}

//
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
	
	xhr.open("GET", "/IllegalSkillsException/features/navBar/homepageNavBar.html", true);
	xhr.send();
}

function loadBoardView(){
	console.log('testing board view');
}