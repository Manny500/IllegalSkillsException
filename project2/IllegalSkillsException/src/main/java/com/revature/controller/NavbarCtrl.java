package com.revature.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

public class NavbarCtrl {

	@RequestMapping(value = "/ajaxNavbar", consumes = MediaType.TEXT_HTML_VALUE, produces = MediaType.TEXT_HTML_VALUE)
	public String homeNavbar() {
		return "features/navBar/homepageNavBar.html";
	}
}