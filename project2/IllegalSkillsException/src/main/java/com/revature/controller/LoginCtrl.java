package com.revature.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
	
	
	
	
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login2(TV2User user){
		
//		TV2User temp = new TV2User();
//		
//		temp.setUserName(request.getParameter("username"));
//		temp.setPassword(request.getParameter("password"));
		
		System.out.println("user: " +user);
	
		
		TV2User clientUser = service.validateLogin(user);
		
		System.out.println("clientuser: "+clientUser);
		
		if(clientUser != null) {
			System.out.println("user is not null");
			return "redirect: features/home/homePage.html";
		}else {
			System.out.println("user IS null");
			return "redirect: features/form/login.html";
		}
		
		
		
	}
	
}