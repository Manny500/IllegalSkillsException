package com.revature.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.revature.domain.TV2User;

@Controller
public class HomepageCtrl {

	@RequestMapping("/")
	public String index() {
		return "/static/features/welcome/index.html";
	}

	@RequestMapping("/welcome")
	public String welcome() {
		return "/static/features/welcome/index.html";
	}

	@RequestMapping("/home")
	public String home() {
		return "/static/homePage.html";
	}

	@RequestMapping(value = { "/profile" }, method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TV2User> profile(HttpServletRequest request) {

		// client wants the bankUser that at this point should be stored in the session
		HttpSession session = request.getSession();

		TV2User clientUser = (TV2User) session.getAttribute("user");

		return new ResponseEntity<TV2User>(clientUser, HttpStatus.OK);
	}

}