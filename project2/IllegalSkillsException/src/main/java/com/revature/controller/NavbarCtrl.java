package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class NavbarCtrl {

	@RequestMapping("/ajaxNavbar")
	public String navbar() {
		return "/static/features/navBar/welcomeNavBar.html";
	}

	

}