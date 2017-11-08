package com.revature.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorCtrl {

	@RequestMapping("/404")
	public String index() {
		return "/static/features/error/404.html";
	}
}