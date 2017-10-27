package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomepageCtrl {
	@RequestMapping("/homepage")
	public String home() {
		return "/features/home/homePage.html";
	}
	
	@RequestMapping("/")
	public String index() {
		return "/features/welcome/index.html";
	}
	
	
}
