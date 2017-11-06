package com.revature.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature.domain.TV2User;
import com.revature.service.AppService;

@Controller
public class RegisterCtrl {

	@Autowired
	private AppService service;
	
	@RequestMapping("/register")
	public String register1() {
		return "redirect: home#!/RegisterUser";
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register2(TV2User user, HttpServletRequest request) {

		try {
		service.createUser(user);
		} catch (Exception e) {
			return "redirect: register";
		}


		return "redirect: home";

		
	}
	
}
