package com.revature.controller;

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
	public String home() {
		return "/static/homePage.html";
	}

}