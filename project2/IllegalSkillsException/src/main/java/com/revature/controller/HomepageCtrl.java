package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomepageCtrl {
	@RequestMapping("/homepage")
	public String home() {
		return "/features/home/home.html";
	}
	
	@RequestMapping("/ajaxNavbar")
	public String homeNavbar() {
		return "/features/navBar/homepageNavBar.html";
	}
	
	@RequestMapping("/")
	public String index() {
		return "/features/form/index.html";
	}
	
	
}
