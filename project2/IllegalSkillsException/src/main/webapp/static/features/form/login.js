///**
// * 
// */
//window.onload = function(){
//	loadLogin();
//}
//function loadLogin(){
//	console.log("hello");
//	var xhr = new XMLHttpRequest();
//	
//	xhr.onreadystatechange = function(){
//		if(xhr.readyState == 4 && xhr.status == 200){
//			document.getElementById("view").innerHTML = xhr.responseText;
//			processUserInfo();
//			
//		}
//	}
//	xhr.open("GET", "login", true);
//	xhr.send();
//}
//
//function processUserInfo(){
//	var xhr = new XMLHttpRequest();
//
//	xhr.onreadystatechange = function() {
//		if (xhr.readyState == 4 && xhr.status == 200) {
//			document.getElementById("view").innerHTML = xhr.responseText;
//
//		}
//	}
//	xhr.open("GET", "homepage", true);
//	xhr.send();
//	
//}