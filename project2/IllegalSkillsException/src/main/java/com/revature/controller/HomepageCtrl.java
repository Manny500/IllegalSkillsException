package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomepageCtrl {

	@RequestMapping("/")
	public String index() {
		return "/features/welcome/index.html";
	}

	@RequestMapping("/homepage")
	public String home() {
		return "/features/home/homePage.html";
	}

}