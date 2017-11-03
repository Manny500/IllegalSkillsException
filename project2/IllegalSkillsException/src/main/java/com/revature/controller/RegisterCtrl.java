package com.revature.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register(TV2User user, HttpServletRequest request) {

		try {
		service.createUser(user);
		} catch (Exception e) {
			return "redirect: RegisterUser";
		}


		return "redirect: home";

		
	}
	
}
