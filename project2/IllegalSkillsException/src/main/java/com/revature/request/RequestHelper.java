package com.revature.request;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.controller.LoginCtrl;

public class RequestHelper {
	
	LoginCtrl log = new LoginCtrl();
	
	public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		switch (request.getRequestURI()) {

		case "/IllegalSkillsException/welcome":

			request.getRequestDispatcher("welcome.html").forward(request, response);
			break;

		case "/IllegalSkillsException/login":

			request.getRequestDispatcher("login.html").forward(request, response);
			break;
	
		case "/IllegalSkillsException/enter":

			log.login(request, response);
			break;
			
		default:

			request.getRequestDispatcher("404.html").forward(request, response);
		}
	}

}
