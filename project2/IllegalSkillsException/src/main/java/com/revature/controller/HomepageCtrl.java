package com.revature.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String home(HttpServletRequest request) {

		if (request.isRequestedSessionIdValid()) {

			return "/static/homePage.html";

		} else {

			return "/static/features/form/login.html";

		}
	}

}