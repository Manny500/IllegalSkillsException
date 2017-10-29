package com.revature.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature.domain.TV2User;
import com.revature.service.AppService;

@Controller
public class LoginCtrl {

	@Autowired
	private AppService service;

	@RequestMapping("/login")
	public String login1() {
		return "/features/form/login.html";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login2(TV2User user) {

		TV2User clientUser = service.validateLogin(user);

		if (clientUser != null) {
			return "redirect: features/home/homePage.html";
		} else {
			return "redirect: features/form/login.html";
		}
	}
}