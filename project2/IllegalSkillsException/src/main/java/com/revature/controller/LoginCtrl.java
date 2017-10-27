package com.revature.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.revature.domain.TV2User;
import com.revature.service.Service;

public class LoginCtrl {
	
//	Service service = new Service();
//
//	public void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//		// return a user so we can store it in a session
//		TV2User clientUser = service.validateLogin(request.getParameter("username"), request.getParameter("password"));
//
//		if (clientUser != null) {
//
//			// store the valid user into the session
//			HttpSession session = request.getSession(); // create one or get existing
//			session.setAttribute("user", clientUser);
//
//			request.getRequestDispatcher("homePage.html").forward(request, response);
//
//		} else {
//
//			// send error
//
//			// refresh page
//			request.getRequestDispatcher("login.html").forward(request, response);
//
//		}
//	}

}