package com.revature.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.revature.domain.TV2User;
import com.revature.service.AppService;
@Controller
public class LoginCtrl {
	@Autowired
	private AppService service;
	
	
	
	@RequestMapping("/login")
	public String login() {
		TV2User us = new TV2User();
		
		us.setUserName("j");
		us.setPassword("123123123131");
		
		TV2User clientUser = service.validateLogin(us);
		
		System.out.println(clientUser);
		
		if(clientUser != null) {
			System.out.println("user is not null");
			return "/features/home/home.html";
		}else {
			System.out.println("user IS null");
			return "/features/form/login.html";
		}
		
		
		
	}
	
}