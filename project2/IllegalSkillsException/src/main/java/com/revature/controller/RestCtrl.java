package com.revature.controller;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.domain.Board;
import com.revature.domain.TV2User;
import com.revature.service.AppService;

@RestController
public class RestCtrl {
	
	@Autowired
	private AppService service;
	
	@RequestMapping(value = { "/profile" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> profile(HttpServletRequest request) {

		// client wants the bankUser that at this point should be stored in the session
		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");
		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}
	
	@RequestMapping(value = { "/updateProfile" }, method = RequestMethod.POST, produces="application/json", consumes="application/json")
	@ResponseBody
	public ResponseEntity<TV2User> updateProfile(@RequestBody TV2User user, HttpServletRequest request) {

		// client wants the bankUser that at this point should be stored in the session
		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");
		
		user.setUserId(clientUser.getUserId());
		user.setRoleType(clientUser.getRoleType());
		user.setTeamId(clientUser.getTeamId());
		
		if(user.getFirstName() == null || user.getFirstName() == "") {
			user.setFirstName(clientUser.getFirstName());
		}
		if(user.getLastName() == null || user.getLastName() == "") {
			user.setLastName(clientUser.getLastName());
		}
		if(user.getUserName() == null || user.getUserName() == "") {
			user.setUserName(clientUser.getUserName());
		}
		if(user.getPassword() == null || user.getPassword() == "") {
			System.out.println("in pass");
			user.setPassword(clientUser.getPassword());
		}
		if(user.getEmail() == null || user.getEmail() == "") {
			user.setEmail(clientUser.getEmail());
		}
			
		service.updateUser(user);

		return new ResponseEntity<TV2User>(user, HttpStatus.OK);
			
	}
	
	@RequestMapping(value = { "/getRole" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> loginInfo(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");
		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Exception> handleException(Exception e){
		System.out.println("lol spring...wow catches exceptions");
		return new ResponseEntity<Exception>(e,HttpStatus.CONFLICT);
	}


	@RequestMapping(value = { "/getHome" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<Set<Board>> homeBoards(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		TV2User clientUser = (TV2User) session.getAttribute("user");
		Set<Board> clientBoards = clientUser.getBoards();
		return new ResponseEntity<Set<Board>>(clientBoards, HttpStatus.OK);
	}
	
}
