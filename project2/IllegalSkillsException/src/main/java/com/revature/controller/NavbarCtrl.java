package com.revature.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.revature.domain.TV2User;

@Controller
public class NavbarCtrl {

	@RequestMapping("/ajaxNavbar")
	public String navbar() {
		return "/static/features/navBar/welcomeNavBar.html";
	}

	@RequestMapping("/role")
	@ResponseBody
	public ResponseEntity<TV2User> handleTodo(@RequestBody TV2User todo,HttpServletRequest request) {

		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");
		
		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}

}