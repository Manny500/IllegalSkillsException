package com.revature.service;

import com.revature.dao.IllegalDao;
import com.revature.dao.IllegalDaoImp;
import com.revature.domain.TV2User;

public class Service {
	
	TV2User user;
	IllegalDao dao = new IllegalDaoImp();
	
	public TV2User validateLogin(String username, String password) {
		
		user = dao.getUser(username);
		
		if (user == null) {

			// Create custom exception delete print out
			return null;
			// throw new AccountDoesNotExistException();
			
		}else if (user.getPassword().equals(password)) {
			
			return user;

		} else {

			return null;
			// throw new CannotAuthenticateException();
		}
	}

}
