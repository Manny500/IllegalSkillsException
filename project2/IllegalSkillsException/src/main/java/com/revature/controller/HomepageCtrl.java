package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomepageCtrl {

	@RequestMapping("/")
	public String index() {
		return "/static/features/welcome/index.html";
	}
	
	@RequestMapping("/home")
	public String app(){
		return "/static/homePage.html";
	}

}